const Event = require("../models/events");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const getEventsById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send({ msg: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const createEvents = async (req, res) => {
  try {
    const { name, date, location, description, category, apiEventId } =
      req.body;
    if (!name || !date || !location) {
      return res
        .status(400)
        .send({ msg: "Name, date, and location are required" });
    }
    const newEvent = new Event({
      name,
      date,
      location,
      description,
      category,
      apiEventId,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const updateEvents = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) return res.status(404).send({ msg: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).send({ msg: "Event not found" });
    res.status(200).send({ msg: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getEvents,
  getEventsById,
  createEvents,
  updateEvents,
  deleteEvents,
};
