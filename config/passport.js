/* GOOGLE AUTHENTICATION
allows users to sign in to a web application using their google account. oAuth2.0
passport-google-oauth20 module
command: $ npm install passport-google-oauth20
modules(commonJS): used to share functions between proyects. require-module.exports
GoogleStrategy: auth users using google account and oAuth 2.0 tokens
App must be registered in Goole Developers Console
client ID and secret provided, URI must be configured to match app route.
*/



const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Database = require('../src/models/database');
const jwt = require('jsonwebtoken');
const TokensController = require('../src/controllers/tokens.controller');
const StudentController = require('../src/controllers/students.controller');
const TeacherController = require('../src/controllers/teachers.controller');

require('dotenv').config();

/*GOOGLE STRATEGY
authenticates users using google account and oAuth 2.0 tokens
client ID and secret provided are supplied as options.
requires a verify callback: receives access token and refresh token(optional)
PROFILE: contains the Authenticated user's GOOGLE PROFILE.
*/

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        
        async (accessToken, refreshToken, profile, done) => {
            //New user created, with a random ID assigned to avoid conflict. 
            //this user has a profile field with GOOGLE INFO
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

}