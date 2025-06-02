// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const segmentRoutes = require("./routes/segmentRoutes");
// const campaignRoutes = require("./routes/campaignRoutes");
// const communicationLogRoutes = require("./routes/communicationLogRoutes");
// const analyticsRoutes = require("./routes/analyticsRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const redisClient = require('./config/redisClient');

// const subscribeCustomerData = require("./subscribers/customerSubscriber");
// const subscribeOrderData = require("./subscribers/orderSubscriber");

// // const segmentRoutes = require("./routes/segmentRoutes");
// // const campaignRoutes = require("./routes/campaignRoutes");
// // const communicationLogRoutes = require("./routes/communicationLogRoutes");
// // // Other route imports
// // const analyticsRoutes = require("./routes/analyticsRoutes");

// // Other middleware and routes
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares

// app.use(cors({
//   origin: "http://localhost:5173",  // React app URL
//   credentials: true                 // Allow cookies/auth headers
// }));

// app.use(express.json());

// subscribeCustomerData();
// subscribeOrderData();
// // Import routes
// // const customerRoutes = require("./routes/customerRoutes");
// // const orderRoutes = require("./routes/orderRoutes");

// // Routes
// app.use("/api/customers", customerRoutes);
// app.use("/api/orders", orderRoutes);

// app.get("/", (req, res) => {
//   res.send("Mini CRM API is running");
// });

// app.use("/api/segments", segmentRoutes);
// app.use("/api/campaigns", campaignRoutes);
// app.use("/api/communication-logs", communicationLogRoutes);
// app.use("/api/analytics", analyticsRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error(err));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

// Load passport config
require("./config/passport");

const segmentRoutes = require("./routes/segmentRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const communicationLogRoutes = require("./routes/communicationLogRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRouter = require('./routes/upload');
const redisClient = require("./config/redisClient");
const subscribeCustomerData = require("./subscribers/customerSubscriber");
const subscribeOrderData = require("./subscribers/orderSubscriber");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middlewares ----------

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ---------- Session & Passport Setup ----------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production (with HTTPS)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ---------- Subscribers ----------
subscribeCustomerData();
subscribeOrderData();

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("Mini CRM API is running");
});

app.use("/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/segments", segmentRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/communication-logs", communicationLogRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use('/api/upload', uploadRouter);
// ---------- MongoDB Connection ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
