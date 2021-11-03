const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth');
const auth= require('../../middlewares/auth')



router.use('/api', apiRoutes);
router.use('/auth', auth.authPer, authRoutes);
module.exports= router;