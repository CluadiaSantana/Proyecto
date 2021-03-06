const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const TeacherController = require('../controllers/teachers.controller');
const auth= require('../../middlewares/auth')


/**
 * @swagger
 * 
 * /api/teachers:
 *   post:
 *     tags:
 *       - teachers
 *     summary: create a new teacher
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the id of the user
 *             type: object
 *           example: 
 *             id: duy2mhkyn
 *     responses:
 *       201:
 *         description: Teacher created correctly!
 *       404:
 *         description: Teacher alredy exist!!  
 */
router.post('/',TeacherController.sign);


/**
 * @swagger
 * 
 * /api/teachers?id={id}:
 *   put:
 *     tags:
 *       - teachers
 *     summary: update a teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          duy2mhkyn
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
 *       200:
 *         description: Update teacher
 *       404:
 *         description: Teacher not found 
 *       401:
 *         description: Unauthorized!!   
 */

 router.put('/', auth.adminValidation, TeacherController.findOneAndUpdateTeacher);

/**
 * @swagger
 * 
 * /api/teachers:
 *   get:
 *     tags:
 *       - teachers
 *     summary: get all the teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: Teacher not found
 *       401:
 *         description: Unauthorized!!   
 */

router.get('/', TeacherController.getTeachers);

/**
 * @swagger
 * 
 * /api/teachers?userName={userName}:
 *   get:
 *     tags:
 *       - teachers
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userName
 *         type: string
 *         example:
 *          Teacher12
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: Teacher not found
 *       401:
 *         description: Unauthorized!!  
 */

router.get('/', TeacherController.getTeachers);



/**
 * @swagger
 * 
 * /api/teachers/{id}:
 *   delete:
 *     tags:
 *       - teachers
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
 *       200:
 *         description: Delete teacher
 *       404:
 *         description: Teacher not found 
 *       401:
 *         description: Unauthorized!! 
 */
router.delete('/:id', auth.adminValidation, TeacherController.deleteTeachers);

module.exports = router;