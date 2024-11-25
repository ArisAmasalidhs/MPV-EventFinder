require("dotenv").config(); // This should be at the top of the file.
const express = require("express");
const cors = require("cors");
const connectDB = require("./configuration/connection");
const eventRoutes = require("./routes/events.routes");
const userRoutes = require("./routes/user.routes");


const app = express();
const port = 8000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to communicate
}));



// Routes
app.use("/events", eventRoutes); // Ensure this matches the route you want
app.use("/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Event Finder API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: "Something went wrong on the server!" });
});

// Database connection and server start
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start due to database connection issues:", err);
  });
