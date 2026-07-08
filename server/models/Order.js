const mongoose =
  require("mongoose");

const orderSchema =
  new mongoose.Schema({

    user: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    items: [

      {

        name: String,

        price: Number,

        quantity: Number,

        image: String

      }

    ],

    totalAmount: {

      type: Number,

      required: true

    },

    deliveryDetails: {

      name: String,

      address: String,

      phone: String

    },

createdAt: {

  type: Date,

  default: Date.now

},

isDelivered: {

  type: Boolean,

  default: false

},

isPaid: {

  type: Boolean,

  default: false

},

paidAt: Date,

deliveredAt: Date

  });

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );