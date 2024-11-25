const express = require("express");
const axios = require("axios");
const router = express.Router(); // Initialize router

// Existing CRUD routes (imported from controller)
const {
  getEvents,
  getEventsById,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/events.controller");

// Fetch Events from SerpAPI
router.get("/fetch-events", async (req, res) => {
  const { location, category } = req.query;

  try {
    // Validate location input
    if (!location || location.trim() === "") {
      console.error("Invalid location provided:", location);
      return res.status(400).json({ msg: "Invalid or missing location parameter." });
    }

    const validatedLocation = location.trim();
    const validatedCategory = category?.trim() || "events nearby"; // Default to "events nearby" if no category is provided
    const apiKey = process.env.SERPAPI_KEY || "c120aaf6b981733325810a1d57885840b1185fd4ea2eb5df9f7a48bd4d3174e6";

    // Construct the API URL
    const apiUrl = `https://serpapi.com/search?engine=google_events&q=${encodeURIComponent(
      validatedCategory
    )}&location=${encodeURIComponent(validatedLocation)}&api_key=${apiKey}`;

    console.log("Requesting SerpAPI with URL:", apiUrl);

    // Make the request to SerpAPI
    const response = await axios.get(apiUrl);

    // Check the response and extract events_results
    const events = response.data.events_results;
    if (!events || events.length === 0) {
      console.warn(`No events found for category "${validatedCategory}" in location "${validatedLocation}"`);
      return res.status(404).json({ msg: `No events found for ${validatedCategory} in ${validatedLocation}` });
    }

    // Map and format the events
    const formattedEvents = events.map((event) => ({
      name: event.title || "Untitled Event",
      date: event.date?.start_date || "Date not available",
      location: event.address?.join(", ") || "Location not available",
      description: event.description || "No description available",
      image_url: event.image || "https://via.placeholder.com/250x150",
      url: event.link || "#",
    }));

    console.log("Formatted Events:", formattedEvents);

    // Send the formatted events
    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error("Error in /fetch-events route:", error.message);

    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }

    res.status(500).json({
      msg: "Error fetching events",
      details: error.response?.data || "Internal Server Error",
    });
  }
});

// CRUD Operations
router.get("/", getEvents);
router.get("/:id", getEventsById);
router.post("/create", createEvents);
router.put("/:id", updateEvents);
router.delete("/:id", deleteEvents);

module.exports = router;
