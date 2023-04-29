import express from "express";
import { testPostConstroller } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

// Router object
const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    User:
 *      type: object
 *      required:
 *        - name
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
 *    name: Test
 *    description: Testing apis
 */

/**
 * @swagger
 * /api/v1/test/test-post:
 *    post:
 *      summary: Testing routes
 *      tags: [Test]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Route working successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal server error
 */

// POST ROUTE || TEST ROUTE
router.post('/test-post',userAuth,testPostConstroller)

// Exporting router
export default router