// backend/server.js
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.js';
import { connectMongoDB } from './config/database.js';

// Import routes
import adminRoutes from './routes/admin.routes.js'; // 👈 New
import modelRoutes from './routes/model.routes.js';
import adminModelRoutes from './routes/admin.model.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js'; // 👈 Add this
import portfolioadminRoutes from './routes/admin/admin.portfolio.routes.js';
import contactRoutes from './routes/contact.routes.js';
import selectionRoutes from "./routes/selection.routes.js";
import adminBlogRoutes from "./routes/admin.blog.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import contestRoutes from "./routes/contestRoutes.js";
import contestParticipationRoutes from "./routes/contestParticipationRoutes.js";
import adminPayments from "./routes/admin/admin.payment.routes.js";
import PublicRoutes from "./routes/public.routes.js";
import editorial from "./routes/editorial.routes.js";
// PublicRoutes
// app.use('/api/upload', uploadRoutes); // 👈 Register /api/upload endpoint
import uploadRoutes from './routes/upload.routes.js'; // 👈 Cloudinary Upload Route Import
const app = express();

// ============================================
// 🔹 SECURITY MIDDLEWARES
// ============================================

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: "http://localhost:3005"|| '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// ============================================
// 🔹 RATE LIMITER
// ============================================

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use('/api', limiter);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

if (process.env.NODE_ENV === "production") {
  app.use("/api", limiter);
}
// ============================================
// 🔹 REQUEST PARSING
// ============================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ============================================
// 🔹 HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: ENV.NODE_ENV,
    database: {
      connected: mongoose.connection.readyState === 1,
      name: mongoose.connection.name || 'not connected',
    },
  });
});

// ============================================
// 🔹 ROUTES
// ============================================

// Admin Model management routes
app.use('/api/admin/', adminRoutes);
// Contact routes
app.use('/api/contact', contactRoutes); // 👈 Add this
// Admin routes
app.use('/api/admin/models', adminModelRoutes);

// Model routes
app.use('/api/models', modelRoutes);

// Portfolio routes (Model)
app.use('/api/portfolio', portfolioRoutes);
// Portfolio routes (Admin)
app.use('/api/admin/portfolio', portfolioadminRoutes);


app.use("/api/selection", selectionRoutes);
// blog 
app.use("/api/blogs", express.json(), blogRoutes);
app.use(
  "/api/admin/blogs",
  express.json({ limit: "10mb" }),
  express.urlencoded({ limit: "10mb", extended: true }),
  adminBlogRoutes
);
app.use('/api/upload', uploadRoutes); // 👈 Register /api/upload endpoint
// Contest Routes
app.use("/api/contests", contestRoutes);
// app.use("/api", PublicRoutes);
// ✅ Mount route on /api/contest-participation
app.use('/api/contest-participation', contestParticipationRoutes);
app.use('/api/admin/payments', adminPayments);
// ============================================
// 🔹 404 HANDLER adminPayments
// ============================================
app.use("/api/editorials", editorial);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ============================================
// 🔹 GLOBAL ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ============================================
// 🔹 START SERVER
// ============================================

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Start Express server
    app.listen(ENV.PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 [Enterprise MongoDB Backend] Engine online`);
      console.log(`📦 Environment: ${ENV.NODE_ENV}`);
      console.log(`🔌 Port: ${ENV.PORT}`);
      console.log(`👤 Models API: http://localhost:${ENV.PORT}/api/models`);
      console.log(`👑 Admin API: http://localhost:${ENV.PORT}/api/admin/models`);
      console.log(`❤️  Health: http://localhost:${ENV.PORT}/health`);
      console.log(`====================================================`);
    });

  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

// Import mongoose for health check
import mongoose from 'mongoose';

startServer();

export default app;