const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const UsersController = require('../controllers/users.controller');
const auth= require('../../middlewares/auth')


/**
 * @swagger
 * 
 * /auth/users:
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
 * /auth/users/login:
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

/**
 * @swagger
 * 
 * /api/users:
 *   get:
 *     summary: delete a user
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

router.get('/', UsersController.getUsers);

/**
 * @swagger
 * 
 * /api/users?id={id}:
 *   get:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          4682ptvjs
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
router.get('/',UsersController.getUsers);

/**
 * @swagger
 * 
 * /api/users:
 *   delete:
 *     summary: delete a user
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
router.delete('/',UsersController.deleteUser);

module.exports = router;