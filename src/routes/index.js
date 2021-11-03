const router = require('express').Router();
const apiRoutes = require('./api');
const auth= require('../../middlewares/auth')

router.use('/api', auth.authPer, apiRoutes);
module.exports= router;