// Imports
// common.js format : const express = require('express');
// Using type as module
import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// configuring dotenv
dotenv.config()


// rest object
const app = express();

// route
app.get('/',(req,resp)=>{
    resp.send("<h1>Welcome to job finder</h1>");
})

// Port
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;

// App listening to port
app.listen(PORT,()=>{
    console.log(`Node server running in ${DEV_MODE} mode on port number ${PORT}`.bgBrightGreen.black);
})