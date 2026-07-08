const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");


const {

  registerUser,
  loginUser,
  forgotPassword,
  resetPassword

} = require(
  "../controllers/userController"
);


// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword); 
router.get("/profile", protect, (req, res) => {

  res.json({
    message: "Protected profile accessed",
    user: req.user
  });

});


module.exports = router;