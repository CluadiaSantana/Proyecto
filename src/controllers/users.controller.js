const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const TokensController = require('../controllers/tokens.controller');
const StudentController = require('../controllers/students.controller');
const TeacherController = require('../controllers/teachers.controller');
require('dotenv').config();


let secret = process.env.JWTSECRET;

class UsersController {
    static sign(req, res) {
        const database = new Database('users');
        let { userName, password, email, role } = req.body;
        if ( !userName || !password || !email || !role) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let codepass = bcrypt.hashSync(password, 10);
        let id= ""+ Math.random().toString(36).substr(2, 9)
        database.insertOne({
            email: email,
            password: codepass,
            userName: userName,
            role: role,
            id: id
        }).then(response => {
            if(role == "student"){
                StudentController.signUser(id,userName)
            }else if(role == "teacher"){
                TeacherController.signUser(id, req.body.salary,userName)
            }
            res.statusMessage = "User created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "User already exist!";
            return res.status(400).end();
        });
    }

    static login(req, res) {
        let { email, password } = req.body;
        if (!email || !password) {
            res.statusMessage = "Data is missing";
            return res.status(400).end();
        }
        const database = new Database('users');
        database.findOne({ email: req.body.email })
            .then(results => {
            if (results) {
                if (!bcrypt.compareSync(password, results.password)) {
                    res.statusMessage = "Incorect data!";
                    return res.status(403).end();
                }
                let response = {
                    email: results.email,
                    userName: results.userName,
                    role: results.role,
                    id: results.id
                };
                let token = jwt.sign(response, secret,{ expiresIn: '1h' });
                TokensController.newToken(token, results.id);
                res.statusMessage = "Login sucess";
                return res.status(200).send({
                    "email": response.email,
                    "role": response.role,
                    "token": token,
                    "userName": response.userName
                });
            }
            else {
                res.statusMessage = "User does not exist!!";
                return res.status(400).end();
            }
        });
    }


    static findOneAndUpdate(req, res){
        const database = new Database('users');
        let codepass = bcrypt.hashSync(req.body.password, 10);
        const update = {$set:
            {
            email: req.body.email,
            password:codepass,
            userName:req.body.userName
        }};
    
        database.findOneAndUpdate({ id: req.query.id }, update).then((user) => {
            if (!user) return res.status(404).send("User dosen´t founded");
            res.status(200).send("Update user");
          });
    }

   

    static getUsers(req, res) {
        const database = new Database('users');
        if(!req.query.id){
            database.find().toArray((err, results) => {
                if(err) {
                    res.status(400).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Users not found');
                } else {
                    res.status(200).send(results);
                }
            });
        }else{
            database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    res.status(200).send( results);;
    
                } else {
                    res.status(400).send('Users not found');
                }
            })
            .catch(err => {});
        }


    }

    static deleteUser(req, res){
        const database = new Database('users');
        database.findOneAndDelete({id: req.params.id}).then((user) => {
            if (!user) {
                return res.status(404).send("User not founded");}
            StudentController.delete(req.params.id);
            TeacherController.delete(req.params.id);
            res.status(200).send("Delete user");
          });
    }
    
}

module.exports = UsersController;
