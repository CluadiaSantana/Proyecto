const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const ClassesController = require('../controllers/classes.controller');
const auth= require('../../middlewares/auth')


/**
 * @swagger
 * 
 * /api/classes:
 *   post:
 *     summary: create a new student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the id of the user
 *             type: object
 *           example: 
 *            numClasses: 50
 *            studentId: jhj51gfh
 *            teacherId: jyt52utu2
 *            weeklyHours: 3
 *     responses:
 *       201:
 *         description: Student created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: Student not alredy exist!!  
 */
router.post('/',ClassesController.sign);


/**
 * @swagger
 * 
 * /api/classes?studentId={studentId}:
 *   put:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         type: string
 *         example:
 *          jhj51gfh
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *            numClasses: 80
 *            weeklyHours: 4
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

 router.put('/', auth.adminValidation, ClassesController.findOneAndUpdateClass);

/**
 * @swagger
 * 
 * /api/classes:
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

router.get('/', ClassesController.getClasses);

/**
 * @swagger
 * 
 * /api/classes?studentId={studentId}&teacherId={teacherId}:
 *   get:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         type: string
 *         example:
 *          jhj51gfh
 *       - in: path
 *         name: teacherId
 *         type: string
 *         example:
 *          jyt52utu2
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

router.get('/', ClassesController.getClasses);



/**
 * @swagger
 * 
 * /api/classes?studentId={studentId}&teacherId={teacherId}:
 *   delete:
 *     summary: delete a student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         type: string
 *         example:
 *          jhj51gfh
 *       - in: path
 *         name: teacherId
 *         type: string
 *         example:
 *          jyt52utu2
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
router.delete('/', auth.adminValidation, ClassesController.deleteClasses);

module.exports = router;