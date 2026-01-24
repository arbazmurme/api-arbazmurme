const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan("dev")); // HTTP request logger

// Static files (if you need to serve any)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const projectRoutes = require("./routes/projectRoutes");
const uploadRoute = require("./routes/uploadRoute");
const skillRoutes = require("./routes/skillRoutes"); 
const experienceEducationRoutes = require("./routes/experienceEducationRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/upload", uploadRoute); // Changed to versioned endpoint
app.use("/api/skills", skillRoutes); // ✅ router function
app.use("/api/v1/experience-education", experienceEducationRoutes);
app.use("/api/v1/contact", contactRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    error: {
      statusCode: 404,
      message: "The requested resource was not found",
    },
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: {
      statusCode: 500,
      message: err.message,
    },
  });
});

// Server configuration
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port http://localhost:${PORT}`);
});