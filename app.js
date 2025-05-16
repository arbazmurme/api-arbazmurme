const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();



const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve files in the uploads folder

// Enable CORS
app.use(cors({ origin: '*', credentials: true }));

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/v1/projects", projectRoutes);

app.use((req, res) => res.send("<h1>Hello World!</h1>"));


const PORT = process.env.POR || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
