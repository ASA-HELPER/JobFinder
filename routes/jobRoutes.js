import express from 'express'
import userAuth from './../middlewares/authMiddleware.js';
import { createJobController, getAllJobsController } from '../controllers/jobController.js';

const router = express.Router()

// routes
router.post('/create-job',userAuth,createJobController);
router.get('/get-job',userAuth,getAllJobsController);

export default router;