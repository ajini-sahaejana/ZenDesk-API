const express = require("express");
const router = express.Router();

const Company = require("../models/Company");

// Create Company
router.post("/", async (req, res) => {
  const company = new Company({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedCompany = await company.save();
    res.json(savedCompany);
  } catch (error) {
    res.json({ message: error });
  }
});

// Company List
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.json({ message: error });
  }
});

// GET company by ID
router.get("/:companyId", async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    res.json(company);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update Specific Company
router.patch("/:companyId", async (req, res) => {
  try {
    const updatedCompany = await Company.updateOne(
      { _id: req.params.companyId },
      {
        $set: { name: req.body.name, description: req.body.description },
      }
    );
    res.json(updatedCompany);
  } catch (error) {
    res.json({ message: error });
  }
});

//Delete Specific Company
router.delete("/:companyId", async (req, res) => {
  try {
    const removedCompany = await Company.deleteOne({ _id: req.params.companyId });
    res.json(removedCompany);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;

// POST /company < create company; body: name, description ✅
// GET /company < list companies ✅
// GET /company/:id < single company; params: id ✅
// POST /company/:id < edit single company; body: name, description ✅
// DELETE /company/:id < delete single user; params: id ✅
