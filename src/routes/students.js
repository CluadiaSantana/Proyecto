const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const StudentController = require('../controllers/students.controller');
const auth= require('../../middlewares/auth')


/**
 * @swagger
 * 
 * /auth/students:
 *   post:
 *     summary: create a new student
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the id of the user
 *             type: object
 *           example: 
 *             id: 9dk9g0f53
 *     responses:
 *       201:
 *         description: student created correctly!
 *       404:
 *         description: student alredy exist!!
 */
router.post('/',StudentController.sign);


/**
 * @swagger
 * 
 * /api/students?id={id}:
 *   put:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          9dk9g0f53
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
 * /api/students?id={id}:
 *   get:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          9dk9g0f53
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