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
 *         description: Student created correctly!
 *       400:
 *         description: Data is missing!
 *       400:
 *         description: Student already exist!!  
 */
 router.post('/',TokensController.sgnToken);


 /**
 * @swagger
 * 
 * /api/tokens:
 *   get:
 *     summary: get all tokens records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       400:
 *         description: Tokens not found! 
 *       403:
 *         description: Database error!
 */

router.get('/', TokensController.getToken);

/**
 * @swagger
 * 
 * /api/tokens?id={id}:
 *   get:
 *     summary: get a tokens from one user
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
 *         description: resukts
 *       403:
 *         description: Database error
 *       400:
 *         description: Tokens not found 
 */

router.get('/', TokensController.getToken);

/**
 * @swagger
 * 
 * /api/tokens/{id}:
 *   delete:
 *     summary: delete all the tokens from a user
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
 *         description: Delete tokens
 *       400:
 *         description: User id not founded   
 */
 router.delete('/:id', auth.adminValidation, TokensController.deleteTokens);


module.exports = router;