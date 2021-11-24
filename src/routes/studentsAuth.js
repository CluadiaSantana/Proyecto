
const router = require('express').Router();
const StudentController = require('../controllers/students.controller');

/**
 * @swagger
 * 
 * /auth/students:
 *   post:
 *     tags:
 *       - students
 *     summary: create a new student
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the id of the user
 *             type: object
 *           example: 
 *             id: gk5hey8f2
 *     responses:
 *       201:
 *         description: student created correctly!
 *       404:
 *         description: student alredy exist!!
 */
 router.post('/',StudentController.sign);

 module.exports = router;