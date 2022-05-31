const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

// Create Event
router.post("/", async (req, res) => {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET Event List
router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.json(event);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET event by ID
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    res.json(event);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update Specific Event
router.patch("/:eventId", async (req, res) => {
  try {
    const updatedEvent = await Event.updateOne(
      { _id: req.params.eventId },
      {
        $set: { name: req.body.name, description: req.body.description },
      }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.json({ message: error });
  }
});

//Delete Specific Event
router.delete("/:eventId", async (req, res) => {
  try {
    const removedEvent = await Event.deleteOne({
      _id: req.params.eventId,
    });
    res.json(removedEvent);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;

// /POST /event < create event; body: name, description ✅
// GET /event < list events ✅
// GET /event/:id < single event; params: id ✅
// POST /event/:id < edit single event; body: name, description ✅
// DELETE /event/:id < delete single event; params: id ✅
