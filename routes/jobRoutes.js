import express from 'express'
import userAuth from './../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobController.js';

const router = express.Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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
 *      security:
 *          - bearerAuth: []
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

// POST ROUTE || CREATE JOB
router.post('/create-job',userAuth,createJobController);

/**
 * @swagger
 * /api/v1/job/get-job:
 *    get:
 *      security:
 *         - bearerAuth: []
 *      summary: Fetch jobs
 *      tags: [Job]
 *      requestBody:
 *       required: false
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

// GET ROUTE || FETCH JOBS
router.get('/get-job',userAuth,getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *    patch:
 *      security:
 *         - bearerAuth: []
 *      summary: Update job
 *      tags: [Job]
 *      parameters:
 *         - name: id
 *           in: path
 *           description: "ID of the user to update it"
 *           required: true
 *           schema:
 *             type: string
 *      requestBody:
 *       description: Update an existing user
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

// PATCH ROUTE || UPDATE JOB
router.patch('/update-job/:id',userAuth,updateJobController);

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *    delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete job
 *      tags: [Job]
 *      parameters:
 *         - name: id
 *           in: path
 *           description: "ID of the user to delete it"
 *           required: true
 *           schema:
 *             type: string
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Job deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal server error
 */

// DELETE ROUTE || DELETE JOB
router.delete('/delete-job/:id',userAuth,deleteJobController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *    get:
 *      security:
 *         - bearerAuth: []
 *      summary: Job status
 *      tags: [Job]
 *      requestBody:
 *       required: false
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

// GET ROUTE || FETCH JOBS STATUS
router.get('/job-stats',userAuth,jobStatsController)

export default router;