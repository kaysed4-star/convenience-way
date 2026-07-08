const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    businessName: {
      type: String,
      required: true,
      trim: true
    },

    documents: [
      {
        type: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        },
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    services: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ServiceCategory",
          required: true
        },
        name: {
          type: String,
          required: true
        },
        description: String,
        price: {
          type: Number,
          required: true
        }
      }
    ],

    location: {
      address: String,
      city: String,
      province: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    rating: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Provider", providerSchema);