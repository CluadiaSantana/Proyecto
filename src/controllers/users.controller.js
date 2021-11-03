const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();

let secret = process.env.JWTSECRET;

class UsersController {
    static sign(req, res) {
        const database = new Database('users');
        let { username, password, email } = req.body;
        if ( !username || !password || !email) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let codepass = bcrypt.hashSync(password, 10);
        database.insertOne({
            email: email,
            password: codepass,
            username: username,
            rol: "",
            id: ""+ Math.random().toString(36).substr(2, 9)
        }).then(response => {
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
                let token = jwt.sign(response, secret);
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

    deleteUser(req, res){
        console.log(req.body);
    //     const database = new Database('users');
    //     if(!userPer){
    //         return res.status(403).end()
    //     }
    //     database.findOne({ id: req.body.id })
    //         .then(results => {
    //         if (results) {
    //             UsersController.deleteOne({id: req.body.id});
    //             //aqui poner eliminar de techers o de students
    //             return res.status(200).end;
    //         }
    //         else {
    //             res.statusMessage = "User not alredy exist!!";
    //             return res.status(400).end();
    //         }
    //     });
    // }

    // find(req, res){
    //     const database= new Database('users');
    //     let token= req.headers["x-auth"];
    //     database.find().then(results=>{
    //         if(results){
    //             res.status(200);
    //             return results;
    //         }else{
    //             res.status(400);
    //             return
    //         }
    //     })
    }

    updateUser(req, res){

    }
    
}

module.exports = UsersController;
