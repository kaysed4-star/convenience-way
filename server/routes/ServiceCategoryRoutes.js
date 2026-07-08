const express = require("express");
const ServiceCategory = require("../models/ServiceCategory");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const router = express.Router();

const defaultCategories = [
  { name: "Cleaning", slug: "cleaning" },
  { name: "Plumbing", slug: "plumbing" },
  { name: "Electrical", slug: "electrical" },
  { name: "Gardening", slug: "gardening" },
  { name: "Painting", slug: "painting" },
  { name: "Car Wash", slug: "car-wash" }
];

router.get("/", async (req, res) => {
  try {
    const categories = await ServiceCategory.find({
      isActive: true
    }).sort("name");

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/seed", auth, admin, async (req, res) => {
  try {
    for (const category of defaultCategories) {
      await ServiceCategory.findOneAndUpdate(
        { slug: category.slug },
        category,
        {
          upsert: true,
          new: true
        }
      );
    }

    const categories = await ServiceCategory.find().sort("name");

    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/", auth, admin, async (req, res) => {
  try {
    const category = await ServiceCategory.create(req.body);

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;