const router = require('express').Router();
const path = require('path');
const UsersController = require('../controllers/users.controller');
const auth= require('../../middlewares/auth');
const multer = require('multer');





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

 router.put('/',UsersController.findOneAndUpdate);

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

router.get('/',auth.adminValidation, UsersController.getUsers);

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

router.get('/',auth.adminValidation, UsersController.getUsers);



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
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, req.id+ext);
    }
});

const fileFilter = function(req, file, cb) {
    let isValid = false;
    console.log(file.mimetype);
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        isValid = true;
        
    }
    cb(null, isValid);
}

const upload = multer({storage: storage, fileFilter: fileFilter});



router.post('/profile', upload.single('file'), UsersController.createProfile)
 

module.exports = router;