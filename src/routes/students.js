const router = require('express').Router();
const StudentController = require('../controllers/students.controller');
const auth= require('../../middlewares/auth')





/**
 * @swagger
 * 
 * /api/students?id={id}:
 *   put:
 *     tags:
 *       - students
 *     summary: update a student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          gk5hey8f2
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *             graduationDate: 5.05.2022
 *             abscences: 3
 *             totalClasses: 50
 *             urlVideo: ""
 *     responses:
 *       200:
 *         description: Update student
 *       404:
 *         description: student not found 
 *       401:
 *         description: Unauthorized!!   
 */

 router.put('/', auth.teacherValidation, StudentController.findOneAndUpdateStudent);

/**
 * @swagger
 * 
 * /api/students:
 *   get:
 *     tags:
 *       - students
 *     summary: get all the students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: student not found
 *       401:
 *         description: Unauthorized!! 
 */

router.get('/', StudentController.getStudents);

/**
 * @swagger
 * 
 * /api/students?userName={userName}:
 *   get:
 *     tags:
 *       - students
 *     summary: get one student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userName
 *         type: string
 *         example:
 *          Alumno A
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: student not found
 *       401:
 *         description: Unauthorized!!  
 */

router.get('/', StudentController.getStudents);



/**
 * @swagger
 * 
 * /api/students/{id}:
 *   delete:
 *     tags:
 *       - students
 *     summary: delete a student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          vb1ph9dxh
 *     responses:
 *       200:
 *         description: Delete student
 *       404:
 *         description: student not found 
 *       401:
 *         description: Unauthorized!!   
 */
router.delete('/:id', auth.adminValidation, StudentController.deleteStudent);

module.exports = router;