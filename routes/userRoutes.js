import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { getAllUsers, updateUserController } from '../controllers/userController.js';

// router object
const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of user collection
 *          example : DHSASDHJDJHVAJDSVJAVSD
 *        name:
 *          type: string
 *          description: User name
 *        lastName:
 *          type: string
 *          description: User Last Name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater then 6 character
 *        location:
 *          type: string
 *          description: user location city or country
 *      example:
 *        id: GDHJGD788BJBJ
 *        name: John
 *        lastName: Doe
 *        email: johndoes@gmail.com
 *        password: test@123
 *        location: mumbai
 */

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: User apis
 */

/**
 * @swagger
 * /api/v1/user/get-users:
 *    get:
 *      security:
 *          - bearerAuth: []
 *      summary: Fetched all users
 *      tags: [User]
 *      requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: users fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal server error
 */

// GET ROUTE || GET USERS
router.get('/get-users',userAuth,getAllUsers);

/**
 * @swagger
 * /api/v1/user/update-user:
 *    put:
 *      security:
 *          - bearerAuth: []
 *      summary: Update user
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal server error
 */

// PUT ROUTE || UPDATE USER
router.put('/update-user',userAuth,updateUserController);

export default router;