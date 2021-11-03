const router = require('express').Router();
const usersRoutes = require('./users');
const studentrsRoutes = require('./students');
const teachersRoutes = require('./teachers');
const tokensRoutes = require('./tokens');
const classesRoutes = require('./classes');

router.use('/users', usersRoutes);
router.use('/students', studentrsRoutes);
router.use('/teachers', teachersRoutes);
router.use('/tokens', tokensRoutes);
router.use('/classes',classesRoutes)

module.exports= router;