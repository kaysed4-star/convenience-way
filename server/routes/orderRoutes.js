const express =
  require("express");

const router =
  express.Router();

const Order =
  require("../models/Order");

const auth =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/admin");

router.post(

  "/",

  auth,

  async (req, res) => {

    try {

      const {

        items,
        totalAmount,
        deliveryDetails

      } = req.body;

      const order =
        new Order({

          user:
            req.user._id,

          items,

          totalAmount,

          deliveryDetails

        });

      await order.save();

      res.status(201).json({

        message:
          "Order placed successfully",

        order

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

});

router.get(

  "/myorders",

  auth,

  async (req, res) => {

    try {

      const orders =
        await Order.find({

          user:
            req.user._id

        }).sort({

          createdAt: -1

        });

      res.json(orders);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

});

router.get(

  "/",

  auth,
  admin,

  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          );

      res.json(orders);

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

});

router.put(

  "/:id/deliver",

  auth,
  admin,

  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({

          message:
            "Order not found"

        });

      }

      order.isDelivered = true;

      order.deliveredAt =
        Date.now();

      await order.save();

      res.json({

        message:
          "Order delivered"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

});

router.put(

  "/:id/pay",

  auth,

  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({

          message:
            "Order not found"

        });

      }

      order.isPaid = true;

      order.paidAt =
        Date.now();

      await order.save();

      res.json({

        message:
          "Order paid"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

});

module.exports = router;