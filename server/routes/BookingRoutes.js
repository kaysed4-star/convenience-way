const express = require("express");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const provider = await Provider.findById(req.body.provider);

    if (!provider || provider.approvalStatus !== "approved") {
      return res.status(400).json({
        message: "Provider is not available"
      });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      ...req.body
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user._id
    })
      .populate("provider", "name businessName rating")
      .populate("service.category", "name slug")
      .sort("-createdAt");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/provider-bookings", auth, async (req, res) => {
  try {
    const provider = await Provider.findOne({
      user: req.user._id
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider profile not found"
      });
    }

    const bookings = await Booking.find({
      provider: provider._id
    })
      .populate("customer", "name email")
      .populate("service.category", "name slug")
      .sort("-createdAt");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/admin", auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email")
      .populate("provider", "name businessName")
      .populate("service.category", "name slug")
      .sort("-createdAt");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put("/:id/status", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = req.body.status;

    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put("/:id/payment", auth, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.paymentStatus = req.body.paymentStatus;

    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;