const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const auth= require('../../middlewares/auth');
const TokensController = require('../controllers/tokens.controller');


/**
 * @swagger
 * 
 * /api/tokens:
 *   post:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *             id: 9dk9g0f53
 *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkNTQHRlc3QuY29tIiwicm9sIjoiIiwiaWQiOiI0NjgycHR2anMiLCJpYXQiOjE2MzU5MTY1MzB9.HRTOrp1C3oPiweTOwzGb4C80arA2BKr_QPm3XLoHef8
 *     responses:
 *       201:
 *         description: User created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
 */
 router.post('/',TokensController.sgnToken);


 /**
 * @swagger
 * 
 * /api/tokens:
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

router.get('/', TokensController.getToken);

/**
 * @swagger
 * 
 * /api/tokens?id={id}:
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

router.get('/', TokensController.getToken);

/**
 * @swagger
 * 
 * /api/tokens/{id}:
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
 router.delete('/:id', auth.adminValidation, TokensController.deleteTokens);


module.exports = router;