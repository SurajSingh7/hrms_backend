import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//Routes
import shiftRoutes from './users/routes/shiftRoutes.js';
import tempScheduleRoutes from './users/routes/tempScheduleRoutes.js';
import employeeEnrollMappingRoutes from './users/routes/employeeEnrollMappingRoutes.js';
import weekOffRoutes from './users/routes/weekOffRoutes.js';
import basicEmployeeRoutes from './users/routes/basicEmployeeRoutes.js';
import employeeRoutes from './users/routes/employeeRoutes.js';
import financialDetailRoutes from './users/routes/financialDetailRoutes.js';
import personalDetailsRoutes from './users/routes/personalDetailsRoutes.js';
import requestRoutes from './users/routes/requestRoutes.js';
import deviceRoutes from './users/controllers/DevicesController.js';
import authRoutes from './users/routes/authRoutes.js';
import permissionRoutes from './users/routes/permissionRoutes.js';
import roleRoutes from './users/routes/roleRoutes.js';
import departmentRoutes from './users/routes/departmentRoutes.js';
import companyRoutes from './users/routes/companyRoutes.js';
import locationRoute from './hrms/routes/locationRoute.js';
import sendMessageRoutes from './users/routes/sendMessageRoutes.js';
import hrmsRoute from './hrms/routes/hrmsRoute.js';
import companyRoute from './hrms/routes/companyRoute.js';
import areaRoute from './hrms/routes/areaRoute.js';
import documentRoutes from './users/routes/documentRoutes.js';
import dispensaryRoutes from "./src/dispensaryManagement/routes/dispensary-location-route.js";
import connectDatabase from './config/connectDatabase.js';

dotenv.config();


const app = express();
const DB_URL = process.env.DB_URL;

await connectDatabase(DB_URL, "userDB");

// Middleware
app.use(express.json({ limit: '500mb' })); 
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// CORS Configuration

app.use(
  cors({
    origin: [
      'https://hradmin.gtel.in',
      'https://portal.gtel.in',
      'http://localhost:3000',
      'https://cp.gtel.in',
      'http://10.253.71.78:3007',
      'https://wabackend.gtel.in',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Routes
app.use('/hrms', shiftRoutes);
app.use('/hrms', tempScheduleRoutes);
app.use('/hrms', employeeEnrollMappingRoutes);
app.use('/hrms', weekOffRoutes);
app.use('/hrms', basicEmployeeRoutes);
app.use('/hrms', employeeRoutes);
app.use('/hrms', financialDetailRoutes);
app.use('/hrms', personalDetailsRoutes);
app.use('/hrms', requestRoutes);
app.use('/hrms/devices', deviceRoutes);
app.use('/hrms', authRoutes);
app.use('/hrms', permissionRoutes);
app.use('/hrms', roleRoutes);
app.use('/hrms', departmentRoutes);
app.use('/hrms', companyRoutes);
app.use('/hrms', locationRoute);
app.use('/hrms', sendMessageRoutes);
app.use('/hrms', hrmsRoute);
app.use('/hrms', companyRoute);
app.use('/hrms', areaRoute);
app.use('/hrms', documentRoutes);

//New Routes 
app.use('/api/dispensary', dispensaryRoutes);

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Report Ok',
  });
});

app.use('/*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;