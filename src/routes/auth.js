const router = require('express').Router();
const usersRoutes = require('./usersAuth');
const studentrsRoutes = require('./studentsAuth');


router.use('/users', usersRoutes);
router.use('/students', studentrsRoutes);


module.exports= router;