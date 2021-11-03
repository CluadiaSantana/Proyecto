const router = require('express').Router();
const usersRoutes = require('./users');
const studentrsRoutes = require('./students');


router.use('/users', usersRoutes);
router.use('/students', studentrsRoutes);


module.exports= router;