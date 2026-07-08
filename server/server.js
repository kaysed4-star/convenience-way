require("dotenv").config();

const validateEnv = require("./config/validateEnv");
validateEnv();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const productRoutes =
  require("./routes/productRoutes");

const app = express();
const uploadRoutes =
  require("./routes/uploadRoutes");

const orderRoutes =
  require("./routes/orderRoutes");  

const paymentRoutes =
  require("./routes/paymentRoutes");

const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
const providerRoutes = require("./routes/providerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");  

// Middleware
if (process.env.FRONTEND_URL) {
  app.use(cors({
    origin: process.env.FRONTEND_URL
  }));
} else {
  app.use(cors());
}

app.use(express.json());
app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use("/api/service-categories", serviceCategoryRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(
  "/api/payment",
  paymentRoutes
);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.log("❌ Database connection error:");
    console.log(err);
  });

app.get("/api/health", (req, res) => {
  res.json({
    message: "API is running"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);

const clientBuildPath = path.join(__dirname, "../client/build");

app.use(express.static(clientBuildPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
