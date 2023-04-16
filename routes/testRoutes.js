import express from "express";
import { testPostConstroller } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

// Router object
const router = express.Router()

// Routes
router.post('/test-post',userAuth,testPostConstroller)

// Exporting router
export default router