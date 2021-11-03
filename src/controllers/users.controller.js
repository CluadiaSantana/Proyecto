const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const TokensController = require('../controllers/tokens.controller');
require('dotenv').config();

let secret = process.env.JWTSECRET;

class UsersController {
    static sign(req, res) {
        const database = new Database('users');
        let { username, password, email, rol } = req.body;
        if ( !username || !password || !email || rol) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let codepass = bcrypt.hashSync(password, 10);
        database.insertOne({
            email: email,
            password: codepass,
            username: username,
            rol: rol,
            id: ""+ Math.random().toString(36).substr(2, 9)
        }).then(response => {
            if(rol == student){
                
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
                    res.statusMessage = "Incorect password!";
                    return res.status(400).end();
                }
                let response = {
                    email: results.email,
                    nombre: results.nombre,
                    rol: results.rol,
                    id: results.id
                };
                let token = jwt.sign(response, secret,{ expiresIn: 60 });
                const database = new Database('tokensControl');
                res.statusMessage = "Login sucess";
                return res.status(200).send({
                    "email": response.email,
                    "rol": response.rol,
                    "token": token
                });
            }
            else {
                res.statusMessage = "User not alredy exist!!";
                return res.status(400).end();
            }
        });
    }

    static updateUser(req, res){

    }

    static getUserByid(req, res) {
        const database = new Database('users');
        console.log(req.query.id)
        database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    console.log('Resultados: ', results);
                    res.send(results);
    
                } else {
                    console.log('No se encontro el usuario');
                }
            })
            .catch(err => {});
    }

   

    static getUsers(req, res) {
        const database = new Database('users');
        if(!req.query.id){
            database.find().toArray((err, results) => {
                if(err) {
                    res.status(400).send('database error');
                }

                if(results.length === 0) {
                    res.status(400).send('users not found');
                } else {
                    res.send(results);
                }
            });
        }else{
            database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    console.log('Resultados: ', results);
                    res.send(results);
    
                } else {
                    console.log('No se encontro el usuario');
                }
            })
            .catch(err => {});
        }


    }

    static deleteUser(req, res){
        
        console.log(req.body);
        return res.status(400).end();
    }
    
}

module.exports = UsersController;
