require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Optional: Use public DNS servers for MongoDB SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

/* ======================
   CONNECT DATABASE
====================== */
connectDB();

/* ======================
   MIDDLEWARE
====================== */

// CORS setup
const corsOptions = {
  origin: "https://superkneewebsite.vercel.app", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions)); // handles preflight requests automatically

// JSON parser
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
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

/* ======================
   OPTIONAL: Check MongoDB SRV Records
====================== */
dns.resolveSrv('_mongodb._tcp.cluster0.j1z837q.mongodb.net', (err, addresses) => {
  if (err) {
    console.warn('MongoDB SRV lookup failed. Check Atlas cluster and whitelist.');
    console.warn(err);
    return;
  }
  console.log('MongoDB SRV records:', addresses);
});