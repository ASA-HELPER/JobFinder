// Imports
// common.js format : const express = require('express');
// Using type as module
import express from "express";
import 'express-async-errors';
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from "./middlewares/errorMiddleware.js";

// configuring dotenv
dotenv.config()

// Connecting to mongodb
connectDB()

// rest object
const app = express();

// Middleware to tell application that we are dealing with json data
app.use(express.json());

// Middleware to connect frontend and backend otherwise will get origin error as we are dealing with different ports
app.use(cors());

// Middleware to know which api gets hitted and how much time it took.
app.use(morgan('dev'));

// route
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);

// Error checking middleware or validation middleware
app.use(errorMiddleware) 

// Port
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;

// App listening to port
app.listen(PORT,()=>{
    console.log(`Node server running in ${DEV_MODE} mode on port number ${PORT}`.bgBrightGreen.black);
})