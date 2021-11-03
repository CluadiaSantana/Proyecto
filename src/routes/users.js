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
 *             rol: "Admin"
 *     responses:
 *       201:
 *         description: User created correctly!
 *       400:
 *         description: Data is missing!
 *       404:
 *         description: User alredy exist!!  
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
 *       200:
 *         description: Login sucess
 *       403:
 *         description: Incorect data! 
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
 *   put:
 *     summary: update a user
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
 *             description: the data to update
 *             type: object
 *           example: 
 *             email: "CS@test.com"
 *             password: "Hola123Hola2"
 *             username: "Claudia1"
 *     responses:
 *       200:
 *         description: Update user
 *       400:
 *         description: User dosen´t founded
 */

 router.put('/', auth.adminValidation ,UsersController.findOneAndUpdate);

/**
 * @swagger
 * 
 * /api/users:
 *   get:
 *     summary: get all the users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       400:
 *         description: Users not found! 
 *       400:
 *         description: Database error! 
 */

router.get('/', UsersController.getUsers);

/**
 * @swagger
 * 
 * /api/users?id={id}:
 *   get:
 *     summary: get a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          4682ptvjs
 *     responses:
 *       200:
 *         description: results
 *       400:
 *         description: Users not found! !  
 */

router.get('/', UsersController.getUsers);



/**
 * @swagger
 * 
 * /api/users/{id}:
 *   delete:
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          c6qodocp0
 *     responses:
 *       200:
 *         description: Delete user
 *       400:
 *         description: User not founded!   
 */
router.delete('/:id', auth.adminValidation, UsersController.deleteUser);

module.exports = router;