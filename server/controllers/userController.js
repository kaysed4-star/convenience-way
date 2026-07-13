const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto =
  require("crypto");

const sendEmail =
  require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Create new user
   const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({
  name,
  email,
  password: hashedPassword
});

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

const token = jwt.sign(

  {

    id: user._id,

    isAdmin:
      user.isAdmin

  },

  process.env.JWT_SECRET,

  {
    expiresIn: "30d"
  }

);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (error) {

  console.log("FORGOT PASSWORD ERROR:");
  console.log(error);

  res.status(500).json({

    message:
      error.message

  });

}

};

const forgotPassword =
  async (req, res) => {

    try {

      const { email } =
        req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(404).json({

          message:
            "User not found"

        });

      }

      const resetToken =

        crypto
          .randomBytes(32)
          .toString("hex");

      user.resetToken =
        resetToken;

      user.resetTokenExpiry =
        Date.now() +
        3600000;

      await user.save();

      const resetUrl =

        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      try {

        await sendEmail(

          user.email,

          "Password Reset",

          `

          <h2>Password Reset</h2>

          <p>
            Click the link below:
          </p>

          <a href="${resetUrl}">
            Reset Password
          </a>

          `

        );

      } catch (emailError) {

        if (process.env.ALLOW_RESET_LINK_RESPONSE === "true") {

          return res.json({

            message:
              "Reset email could not be sent. Use the reset link below for prototype testing.",

            resetUrl

          });

        }

        throw emailError;

      }

      res.json({

        message:
          "Reset email sent"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};

const resetPassword =
  async (req, res) => {

    try {

      const { token } =
        req.params;

      const { password } =
        req.body;

      const user =
        await User.findOne({

          resetToken:
            token,

          resetTokenExpiry:
            { $gt: Date.now() }

        });

      if (!user) {

        return res.status(400).json({

          message:
            "Invalid token"

        });

      }

      user.password =
        await bcrypt.hash(
          password,
          10
        );

      user.resetToken =
        undefined;

      user.resetTokenExpiry =
        undefined;

      await user.save();

      res.json({

        message:
          "Password updated"

      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

};


module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
};

