const express = require("express");
const Provider = require("../models/Provider");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const provider = await Provider.create({
      user: req.user._id,
      ...req.body
    });

    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find({
      approvalStatus: "approved"
    })
      .populate("services.category", "name slug")
      .sort("-rating.average");

    res.json(providers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/admin", auth, admin, async (req, res) => {
  try {
    const providers = await Provider.find()
      .populate("user", "name email")
      .populate("services.category", "name slug")
      .sort("-createdAt");

    res.json(providers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .populate("user", "name email")
      .populate("services.category", "name slug");

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found"
      });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put("/:id/approval", auth, admin, async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found"
      });
    }

    provider.approvalStatus = req.body.approvalStatus;

    await provider.save();

    res.json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;