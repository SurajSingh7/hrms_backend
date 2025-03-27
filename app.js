import express from "express";
import dotenv from "dotenv";

import {corsConfig} from "./config/cors-config.js";
import connectDatabase from './config/connect-database.js';
import {setupMiddleware} from "./middlewares/setup-middleware.js";
import apiRateLimiter from "./config/rate-limiter.js";
import setupSecurity from "./config/security-config.js";

dotenv.config();
const app = express();
const DB_URL = process.env.DB_URL;

// Database Connection
await connectDatabase(DB_URL, "userDB");

// Middleware Setup
setupMiddleware(app);
app.use(corsConfig);
app.disable("x-powered-by");
setupSecurity(app);

// Import Routes
import hrmsRoutes from "./src/globalRoutes/hrms-routes.js";
import apiRoutes from "./src/globalRoutes/api-routes.js";

// Routes
app.use("/hrms", hrmsRoutes);
app.use("/api", apiRateLimiter, apiRoutes);

// Health Check Route
app.get("/", (req, res) => {return res.json({success: true,message: "Report Ok"})});

app.use("/*", (req, res) => {return res.status(404).json({success: false,message: "Route not found"})});

export default app;