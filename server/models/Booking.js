const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true
    },

    service: {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    location: {
      address: {
        type: String,
        required: true
      },
      city: String,
      province: String
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "declined",
        "in_progress",
        "completed",
        "cancelled",
        "disputed"
      ],
      default: "pending"
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "held", "released", "refunded"],
      default: "unpaid"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);