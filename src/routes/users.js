const { Db } = require('mongodb');
const router = require('express').Router();
const Database = require('./../models/database');
const path = require('path');
const UsersController = require('../controllers/users.controller');
const auth= require('../../middlewares/auth');
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
 * /api/users:
 *   put:
 *     tags:
 *       - users
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
 *             userName: "Claudia12"
 *     responses:
 *       200:
 *         description: Update user
 *       400:
 *         description: User doesn´t found
 *       401:
 *         description: Unauthorized!! 
 */

 router.put('/', auth.adminValidation ,UsersController.findOneAndUpdate);

/**
 * @swagger
 * 
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     summary: get all the users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: results
 *       400:
 *         description: Users not found! 
 *       401:
 *         description: Unauthorized!! 
 */

router.get('/', UsersController.getUsers);

/**
 * @swagger
 * 
 * /api/users?id={id}:
 *   get:
 *     tags:
 *       - users
 *     summary: get a user by id
 *     security:
 *       - bearerAuth: []
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

router.get('/', UsersController.getUsers);



/**
 * @swagger
 * 
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example:
 *          lsn06z589
 *     responses:
 *       200:
 *         description: Delete user
 *       400:
 *         description: User not founded! 
 *       401:
 *         description: Unauthorized!!   
 */
router.delete('/:id', auth.adminValidation, UsersController.deleteUser);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'perfilphtos'));
    },
    filename: function(req, file, cb) {
        let name= req.userName;
        cb(null, name);
    }
});

const fileFilter = function(req, file, cb) {
    console.log('File filter: ', file.mimetype);
    let isValid = false;
    if(file.mimetype === 'image/jpeg') {
        isValid = true;
    }
    cb(null, isValid);
}

const upload = multer({storage: storage, fileFilter: fileFilter});
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
router.post('/google',UsersController.googleLogin)

module.exports = router;