import express from 'express'
import userAuth from './../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, updateJobController } from '../controllers/jobController.js';

const router = express.Router()

// routes
router.post('/create-job',userAuth,createJobController);
router.get('/get-job',userAuth,getAllJobsController);
router.patch('/update-job/:id',userAuth,updateJobController);
router.delete('/delete-job/:id',userAuth,deleteJobController);

export default router;