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
 *         description: Student created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: Student not alredy exist!!  
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
 *       201:
 *         description: Login sucess
 *       403:
 *         description: Incorect password! 
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
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
 *       201:
 *         description: Login sucess
 *       403:
 *         description: Incorect password! 
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
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
 *       201:
 *         description: Login sucess
 *       403:
 *         description: Incorect password! 
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
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
 *       201:
 *         description: Login sucess
 *       403:
 *         description: Incorect password! 
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
 */
router.delete('/:id', auth.adminValidation, StudentController.deleteStudent);

module.exports = router;