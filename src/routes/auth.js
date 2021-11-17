const router = require('express').Router();
const passport =  require('passport');
const usersRoutes = require('./users');
const studentrsRoutes = require('./students');
const teachersRoutes = require('./teachers');

router.use('/users', usersRoutes);
router.use('/students', studentrsRoutes);
router.use('/teachers', teachersRoutes);

//Auth with Google
//GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//Auth with Google
//GET /auth/google
router.get('/google/callback', passport.authenticate('google', {failureRedirect:
'/'}), (req, res) =>{
    res.redirect('/users')
})
module.exports= router;