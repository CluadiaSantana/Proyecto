const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth');
const auth= require('../../middlewares/auth')



router.use('/api', auth.authPer, apiRoutes);
router.use('/auth', authRoutes);
module.exports= router; 