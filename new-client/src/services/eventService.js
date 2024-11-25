import axios from "axios";

const API_BASE_URL = "http://localhost:8000/events";

const fetchEvents = async (category = "events nearby", location = "New York") => {
  try {
    console.log(`Fetching events for category "${category}" and location "${location}"`);
    const response = await axios.get(`${API_BASE_URL}/fetch-events`, {
      params: { category, location },
    });
    return response.data; // Return the events data
  } catch (error) {
    console.error("Error in fetchEvents:", {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
    });
    throw error; // Rethrow the error for handling in the calling function
  }
};

export default fetchEvents;
