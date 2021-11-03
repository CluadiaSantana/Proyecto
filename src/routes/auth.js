const router = require('express').Router();
const usersRoutes = require('./users');
const studentrsRoutes = require('./students');
const teachersRoutes = require('./teachers');

router.use('/users', usersRoutes);
router.use('/students', studentrsRoutes);
router.use('/teachers', teachersRoutes);

module.exports= router;