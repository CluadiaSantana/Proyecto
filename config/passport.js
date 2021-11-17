const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Database = require('../src/models/database');
const jwt = require('jsonwebtoken');
const TokensController = require('../src/controllers/tokens.controller');
const StudentController = require('../src/controllers/students.controller');
const TeacherController = require('../src/controllers/teachers.controller');

require('dotenv').config();

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                id: ""+ Math.random().toString(36).substr(2, 9),
                googleId: profile.id,
                userName: profile.displayName,
                email: profile.emails[0].value,
                role: 'student'
            }

            try{
                let user = await User.findOne({googleId: profile.id})

                if(user){
                    
                } else{
                    user = database.insertOne(newUser).then(response => {
                        if(role == "student"){
                            StudentController.signUser(id)
                        }else if(role == "teacher"){
                            TeacherController.signUser(id, req.body.salary)
                        }
                        res.statusMessage = "User created correctly!";
                        return res.status(201).end();
                    })
                        .catch(error => {
                        res.statusMessage = "User already exist!";
                        return res.status(400).end();
                    });
                    
                }
            } catch(err){
                console.error(err)
                return
            }
            let token = jwt.sign(response, secret,{ expiresIn: '1h' });
                TokensController.newToken(token, results.id);
                res.statusMessage = "Login sucess";
                res.status(200).send({
                    "email": user.email,
                    "role": user.role,
                    "token": user.token
                });
                done(null, user)
                
        } 
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    });
}