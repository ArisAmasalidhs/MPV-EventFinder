const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventsById,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/events.controller");

router.get("/", getEvents);
router.get("/:id", getEventsById);
router.post("/create", createEvents);
router.put("/:id", updateEvents);
router.delete("/:id", deleteEvents);

module.exports = router;
