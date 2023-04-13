import express from "express";
import { testPostConstroller } from "../controllers/testController.js";

// Router object
const router = express.Router()

// Routes
router.post('/test-post',testPostConstroller)

// Exporting router
export default router