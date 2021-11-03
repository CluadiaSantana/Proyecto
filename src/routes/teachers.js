const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const TeacherController = require('../controllers/teachers.controller');
const auth= require('../../middlewares/auth')


/**
 * @swagger
 * 
 * /auth/teachers:
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
router.post('/',TeacherController.sign);


/**
 * @swagger
 * 
 * /api/teachers?id={id}:
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
 *             salary: 15000
 *             status: Active
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

 router.put('/', auth.adminValidation, TeacherController.findOneAndUpdateStudent);

/**
 * @swagger
 * 
 * /api/teachers:
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

router.get('/', TeacherController.getStudents);

/**
 * @swagger
 * 
 * /api/teachers?id={id}:
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

router.get('/', TeacherController.getStudents);



/**
 * @swagger
 * 
 * /api/teachers/{id}:
 *   delete:
 *     summary: delete a student
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
router.delete('/:id', auth.adminValidation, TeacherController.deleteStudent);

module.exports = router;