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
 *     tags:
 *       - Tokens
 *     summary: create new record of a token
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
 *         description: Record created correctly!
 *       400:
 *         description: Record alrady exist!
 *       401:
 *         description: Unauthorized!! 
 */
 router.post('/',TokensController.sgnToken);


 /**
 * @swagger
 * 
 * /api/tokens:
 *   get:
 *     tags:
 *       - Tokens
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
 *       401:
 *         description: Unauthorized!! 
 */

router.get('/',auth.adminValidation, TokensController.getToken);

/**
 * @swagger
 * 
 * /api/tokens?id={id}:
 *   get:
 *     tags:
 *       - Tokens
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
 *       401:
 *         description: Unauthorized!! 
 */

router.get('/',auth.adminValidation, TokensController.getToken);

/**
 * @swagger
 * 
 * /api/tokens/{id}:
 *   delete:
 *     tags:
 *       - Tokens
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
 *       401:
 *         description: Unauthorized!!   
 */
 router.delete('/:id', auth.adminValidation, TokensController.deleteTokens);


module.exports = router;