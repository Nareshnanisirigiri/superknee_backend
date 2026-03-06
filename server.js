const express = require("express");
const cors = require("cors");
const dns = require("dns");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Use public DNS servers to avoid local resolver refusing SRV queries
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

/* ======================
   CONNECT DATABASE
====================== */
connectDB();

/* ======================
   MIDDLEWARE
====================== */

// CORS configuration
const corsOptions = {
  origin: "https://superkneewebsite.vercel.app", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you need cookies or auth headers
};
app.use(cors(corsOptions));

app.use(express.json());

/* ======================
   ROUTES
====================== */

// Auth routes
app.use("/api/auth", authRoutes);

// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ======================
   SERVER
====================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});