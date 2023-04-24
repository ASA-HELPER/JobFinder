import express from 'express'
import userAuth from './../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobController.js';

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - company
 *        - position
 *        - workLocation
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        company:
 *          type: string
 *          description: Company name
 *        position:
 *          type: string
 *          description: Job Position name (upto 100 characters)
 *        status:
 *          type: string
 *          description: Job Status (pending,reject,interview)
 *        workType:
 *          type: string
 *          description: Type of hiring (full-time,part-time,internship,contract)
 *        workLocation:
 *          type: string
 *          description: Work location city or country
 *        createdBy:
 *          type: ObjectId
 *          description: Job creator Id
 *      example:
 *        id: GDHJGD788BJBJ
 *        company: Google
 *        position: Software Developer
 *        status: interview
 *        workType: full-time
 *        workLocation: Silicon Valley
 *        createdBy: B237I389B24f82401
 */

// routes
router.post('/create-job',userAuth,createJobController);
router.get('/get-job',userAuth,getAllJobsController);
router.patch('/update-job/:id',userAuth,updateJobController);
router.delete('/delete-job/:id',userAuth,deleteJobController);
router.get('/job-stats',userAuth,jobStatsController)

export default router;