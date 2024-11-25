import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import EventCarousel from "./components/EventCarousel";
import CategoryTabs from "./components/CategoryTabs";
import EventCardGrid from "./components/EventCardGrid";
import Footer from "./components/Footer";
import fetchEvents from "./services/eventService";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [city, setCity] = useState("New York"); // Default city state
  const [events, setEvents] = useState([]); // Events state to store fetched events
  const [loading, setLoading] = useState(true); // Loading state for events
  const [carouselEvents, setCarouselEvents] = useState([]); // Events for the carousel

  const handleSearch = async (searchCity) => {
    if (!searchCity || searchCity.trim() === "") {
      console.error("Search city is invalid or empty.");
      return;
    }

    setLoading(true);
    setCity(searchCity); // Update the city
    try {
      const data = await fetchEvents(searchCity); // Fetch events for the city
      setEvents(data);
      setCarouselEvents(data.slice(0, 5)); // Top 5 events for the carousel
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const onCategorySelect = async (category) => {
    const location = city?.trim() || "New York"; // Ensure we have a valid location
    console.log(`Fetching events for category: ${category}, location: ${location}`);
  
    setLoading(true);
  
    try {
      const data = await fetchEvents(category, location); // Pass both category and location
      if (data.length === 0) {
        console.warn(`No events found for category "${category}" in location "${location}"`);
      }
      setEvents(data);
    } catch (error) {
      console.error(`Error fetching events for category "${category}" in location "${location}":`, error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const getLocationAndEvents = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords: { latitude, longitude } }) => {
            try {
              const userLocation = await fetchLocationFromCoords(latitude, longitude);
              setCity(userLocation); // Update the city with the detected location

              const data = await fetchEvents("events nearby", userLocation);
              setEvents(data);
              setCarouselEvents(data.slice(0, 5));
            } catch (error) {
              console.error("Error fetching events for location:", error);
              setEvents([]);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported.");
        setLoading(false);
      }
    };

    getLocationAndEvents();
  }, []);

  const fetchLocationFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=YOUR_GEOCODE_API_KEY`
      );
      const data = await response.json();
      return data.results[0]?.components?.city || "New York";
    } catch (error) {
      console.error("Error fetching location from coordinates:", error);
      return "New York";
    }
  };

  return (
    <AuthProvider>
      <div className="app">
        <Navbar onSearch={handleSearch} />
        <EventCarousel events={carouselEvents} />
        <CategoryTabs onCategorySelect={onCategorySelect} />
        <EventCardGrid events={events} loading={loading} city={city} />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
