const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const RegistrationRecordController = require('../controllers/registrationRecord.controller');
const auth= require('../../middlewares/auth')


/**
 * @swagger
 * 
 * /api/records:
 *   post:
 *     tags:
 *       - records
 *     summary: create a new record
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the id of the user
 *             type: object
 *           example: 
 *            teacherId: jyt52utu2
 *            studentId: jhj51gfh
 *            date: 05.11.2021
 *            hour: 3 a 4
 *     responses:
 *       201:
 *         description: Record created correctly
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: Record already exist  
 *       401:
 *         description: Unauthorized!! 
 */
router.post('/',RegistrationRecordController.sign);


/**
 * @swagger
 * 
 * /api/records?studentId={studentId}&teacherId={teacherId}:
 *   put:
 *     tags:
 *       - records
 *     summary: update a record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
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
 *            status: Cancelada
 *     responses:
 *       200:
 *         description: Update Record
 *       403:
 *         description: Database error! 
 *       404:
 *         description: Record not found
 *       401:
 *         description: Unauthorized!!
 */

 router.put('/', RegistrationRecordController.findOneAndUpdateRegister);

/**
 * @swagger
 * 
 * /api/records:
 *   get:
 *     tags:
 *       - records
 *     summary: get all the records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: Record not found
 *       401:
 *         description: Unauthorized!!  
 */

router.get('/', RegistrationRecordController.getRegistration);

/**
 * @swagger
 * 
 * /api/records?studentId={studentId}:
 *   get:
 *     tags:
 *       - records
 *     summary: get a records by studen id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         type: string
 *         example:
 *          jhj51gfh
 *     responses:
 *       200:
 *         description: results
 *       403:
 *         description: Database error
 *       404:
 *         description: Record not found
 *       401:
 *         description: Unauthorized!!  
 */

router.get('/', RegistrationRecordController.getRegistration);



/**
 * @swagger
 * 
 * /api/records?studentId={studentId}&teacherId={teacherId}:
 *   delete:
 *     tags:
 *       - records
 *     summary: delete record
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
 *         description: Delete records
 *       400:
 *         description: Record not found
 *       401:
 *         description: Unauthorized!! 
 */
router.delete('/', auth.adminValidation, RegistrationRecordController.deleteRegistration);

module.exports = router;