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
 *     summary: create a new class
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the data for create a new class
 *             type: object
 *           example: 
 *            numClasses: 50
 *            studentId: jhj51gfh
 *            teacherId: jyt52utu2
 *            weeklyHours: 3
 *     responses:
 *       201:
 *         description: Class created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: Class already exist!!  
 *       401:
 *         description: Unauthorized!! 
 */
router.post('/',ClassesController.sign);


/**
 * @swagger
 * 
 * /api/classes?studentId={studentId}&teacherId={teacherId}:
 *   put:
 *     summary: update a class
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the student-teacher id
 *             type: object
 *           example: 
 *            numClasses: 80
 *            weeklyHours: 4
 *     responses:
 *       201:
 *         description: Update Class
 *       404:
 *         description: Class not found  
 *       401:
 *         description: Unauthorized!! 
 */

 router.put('/', auth.adminValidation, ClassesController.findOneAndUpdateClass);

/**
 * @swagger
 * 
 * /api/classes:
 *   get:
 *     summary: get all classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: Classes not found
 *       401:
 *         description: Unauthorized!!  
 */

router.get('/',auth.teacherValidation, ClassesController.getClasses);

/**
 * @swagger
 * 
 * /api/classes?studentId={studentId}&teacherId={teacherId}:
 *   get:
 *     summary: search a class
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
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: Classes not found
 *       401:
 *         description: Unauthorized!!  
 */

router.get('/',auth.teacherValidation, ClassesController.getClasses);



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
 *       200:
 *         description: Delete class
 *       400:
 *         description: Class not found
 *       401:
 *         description: Unauthorized!!  
 */
router.delete('/', auth.adminValidation, ClassesController.deleteClasses);

module.exports = router;