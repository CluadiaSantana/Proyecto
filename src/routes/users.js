const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const UsersController = require('../controllers/users.controller');


/**
 * @swagger
 * 
 * /api/users:
 *   post:
 *     summary: create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *             email: "CS@test.com"
 *             password: "Hola123Hola"
 *             username: "Claudia"
 *     responses:
 *       201:
 *         description: User created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User not alredy exist!!  
 */
router.post('/',UsersController.sign);

/**
 * @swagger
 * 
 * /api/users/login:
 *   post:
 *     summary: user login 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *             email: "CS@test.com"
 *             password: "Hola123Hola"
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
router.post('/login',UsersController.login);




module.exports = router;