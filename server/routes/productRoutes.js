  const express = require("express");

  const router = express.Router();

  const Product =
    require("../models/Product");

  const auth =
    require("../middleware/authMiddleware");  

  const admin =
    require("../middleware/admin");  


  // CREATE PRODUCT
  router.post("/", 
    
    auth,
    admin,

    async (req, res) => {

  
    try {

      const {
        name,
        price,
        description,
        image
      } = req.body;

      const product =
        new Product({

          name,
          price,
          description,
          image

        });

      await product.save();

      res.status(201).json(product);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  });

  router.put(

    "/:id",

    auth,
    admin,

    async (req, res) => {

      try {

        const product =
          await Product.findById(
            req.params.id
          );

        if (!product) {

          return res.status(404).json({

            message:
              "Product not found"

          });

        }

        product.name =
          req.body.name ||
          product.name;

        product.price =
          req.body.price ||
          product.price;

        product.description =
          req.body.description ||
          product.description;

        await product.save();

        res.json(product);

      } catch (error) {

        res.status(500).json({

          message:
            error.message

        });

      }

  });


  // GET ALL PRODUCTS
  router.get("/", async (req, res) => {

    try {

      const products =
        await Product.find();

      res.json(products);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  });



  router.delete(

    "/:id",

    auth,
    admin,

    async (req, res) => {

      try {

        const product =
          await Product.findById(
            req.params.id
          );

        if (!product) {

          return res.status(404).json({

            message:
              "Product not found"

          });

        }

        await product.deleteOne();

        res.json({

          message:
            "Product deleted"

        });

      } catch (error) {

        res.status(500).json({

          message:
            error.message

        });

      }

  });

  module.exports = router;