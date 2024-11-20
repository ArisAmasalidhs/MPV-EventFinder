const express = require("express");
const cors = require("cors");
const connectDB = require("./configuration/connection"); // Import the connectDB function
const eventRoutes = require("./routes/events.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/events", eventRoutes);
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
