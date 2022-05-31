const express = require("express");
const router = express.Router();

const Wellbeing = require("../models/Wellbeing");

// Create Wellbeing
router.post("/", async (req, res) => {
  const wellbeing = new Wellbeing({
    user: req.body.user,
    index: req.body.index,
  });
  try {
    const savedWellbeing = await wellbeing.save();
    res.json(savedWellbeing);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET Wellbeing List
router.get("/", async (req, res) => {
  try {
    const wellbeing = await Wellbeing.find();
    res.json(wellbeing);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET wellbeing by ID
router.get("/:wellbeingId", async (req, res) => {
  try {
    const wellbeing = await Wellbeing.findById(req.params.wellbeingId);
    res.json(wellbeing);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update Specific Wellbeing
router.patch("/:wellbeingId", async (req, res) => {
  try {
    const updatedWellbeing = await Wellbeing.updateOne(
      { _id: req.params.wellbeingId },
      {
        $set: {
          company: req.body.company,
          email: req.body.email,
          role: req.body.role,
        },
      }
    );
    res.json(updatedWellbeing);
  } catch (error) {
    res.json({ message: error });
  }
});

//Delete Specific Wellbeing
router.delete("/:wellbeingId", async (req, res) => {
  try {
    const removedWellbeing = await Wellbeing.deleteOne({
      _id: req.params.wellbeingId,
    });
    res.json(removedWellbeing);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;

// POST /wellbeing < create wellbeing; body: user, index ✅
// GET /wellbeing < list wellbeing ✅
// GET /wellbeing/:id < single wellbeing; params: id ✅
// POST /wellbeing/:id < edit single wellbeing; body: company, email, role ✅
// DELETE /wellbeing/:id < delete single wellbeing; params: id ✅
