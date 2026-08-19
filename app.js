const path = require("path");
const dotenv = require("dotenv");

// Load environment variables before other imports
dotenv.config({ path: path.join(__dirname, ".env") });
// Premium Email UI templates enabled

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");

// Initialize Express app
const app = express();

// Database connection
connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(morgan("dev")); // HTTP request logger
console.log("MONGO_URI", process.env.MONGO_URI);

// Static files (if you need to serve any)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const projectRoutes = require("./routes/projectRoutes");
const uploadRoute = require("./routes/uploadRoute");
const skillRoutes = require("./routes/skillRoutes");
const experienceEducationRoutes = require("./routes/experienceEducationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/upload", uploadRoute); // Changed to versioned endpoint
app.use("/api/skills", skillRoutes); // ✅ router function
app.use("/api/v1/experience-education", experienceEducationRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/job-applications", jobApplicationRoutes);
app.use("/api/v1/auth", authRoutes);

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