const router = require('express').Router();
const path = require('path');
const UsersController = require('../controllers/users.controller');
const multer = require('multer');

/**
 * @swagger
 * 
 * /auth/users:
 *   post:
 *     tags:
 *       - users
 *     summary: create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             description: the email and password
 *             type: object
 *           example: 
 *             email: "Admin2@test.com"
 *             password: "Hola123Hola"
 *             userName: "Admin2"
 *             role: "Admin"
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
  *     tags:
  *       - users
  *     summary: user login 
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             description: the email and password
  *             type: object
  *           example:  
  *             email: "Admin@test.com"
  *             password: "Hola123Hola"
  *     responses:
  *       200:
  *         description: Login success
  *       403:
  *         description: Incorrect data! 
  *       400:
  *         description: Data is missing!
  *       404:
  *         description: User not alredy exist!!  
  */
 router.post('/login',UsersController.login);

 /**
 * @swagger
 * 
 * /auth/users/google:
 *   get:
 *     tags:
 *       - users
 *     summary: get a user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          m9q0e8h78
 *     responses:
 *       200:
 *         description: results
 *       400:
 *         description: Users not found! !
 *       401:
 *         description: Unauthorized!!   
 */
router.get('/profile/:photoName', UsersController.profile)


router.post('/google',UsersController.googleLogin)


module.exports = router;