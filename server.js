const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors middleware
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5069;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Enable CORS and allow all origins
app.use(cors({ origin: "*" })); // Allows requests from any origin

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Blogging API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
