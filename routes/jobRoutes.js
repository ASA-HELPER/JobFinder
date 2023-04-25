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
/**
 *  @swagger
 *  tags:
 *    name: Job
 *    description: Job apis
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *    post:
 *      summary: create new job
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Job created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */

router.post('/create-job',userAuth,createJobController);

/**
 * @swagger
 * /api/v1/job/get-job:
 *    post:
 *      summary: create new job
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Jobs fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */

router.get('/get-job',userAuth,getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-job/:id:
 *    post:
 *      summary: Update job
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Jobs updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */

router.patch('/update-job/:id',userAuth,updateJobController);

/**
 * @swagger
 * /api/v1/job/delete-job/:id:
 *    post:
 *      summary: Delete job
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Jobs deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */

router.delete('/delete-job/:id',userAuth,deleteJobController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *    post:
 *      summary: Job status
 *      tags: [Job]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Job Status fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */

router.get('/job-stats',userAuth,jobStatsController)

export default router;