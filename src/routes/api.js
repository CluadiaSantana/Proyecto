const router = require('express').Router();
const usersRoutes = require('./users');
const studentrsRoutes = require('./students');
const teachersRoutes = require('./teachers');
const tokensRoutes = require('./tokens');
const classesRoutes = require('./classes');
const recordsRouters = require('./records')

router.use('/users', usersRoutes);
router.use('/students', studentrsRoutes);
router.use('/teachers', teachersRoutes);
router.use('/tokens', tokensRoutes);
router.use('/classes',classesRoutes);
router.use('/records', recordsRouters);

module.exports= router;