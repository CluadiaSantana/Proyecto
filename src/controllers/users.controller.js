const Database = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TokensController = require("../controllers/tokens.controller");
const StudentController = require("../controllers/students.controller");
const TeacherController = require("../controllers/teachers.controller");
const {
    OAuth2Client
} = require('google-auth-library');
const {
    env
} = require("process");
require("dotenv").config();

let secret = process.env.JWTSECRET;

class UsersController {
    static sign(req, res) {
        const database = new Database("users"); //Se llama a la base de datos con la collection 'users'
        let {
            userName: userName,
            password,
            email,
            role
        } = req.body; //req.body es de donde se sacan los datos en la funcion
        if (!userName || !password || !email || !role) {
            //Si no se encuentra algun dato mandar a error
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let codepass = bcrypt.hashSync(password, 10); //bycrpt es para codificar el password en la base de datos
        let id = "" + Math.random().toString(36).substr(2, 9); //Se crea el id
        database
            .insertOne({
                //Funcion insertOne que se encuentra en 'models' se manda a llamar
                email: email,
                password: codepass,
                userName: userName, //Data que se le pasa como parametro para insertar en la collection 'users'
                role: role,
                id: id,
            })
            .then((response) => {
                if (role == "student") {
                    //Si el rol es student se llama a la funcion signUser() del Student Controller
                    StudentController.signUser(id);
                } else if (role == "teacher") {
                    //Si el rol es teacher se llama a la funcion signUser() del Student Controller
                    TeacherController.signUser(id, req.body.salary);
                }
                res.statusMessage = "User created correctly!"; //Una vez insertada la data en el rol correcto se manda mensaje de exito
                return res.status(201).end();
            })
            .catch((error) => {
                res.statusMessage = "User already exist!"; //La data tiene error y se manda mensaje de error
                return res.status(400).end();
            });
    }

    static login(req, res) {
        let {
            email,
            password
        } = req.body;
        if (!email || !password) {
            res.statusMessage = "Data is missing";
            return res.status(400).end();
        }
        const database = new Database("users");
        database
            .findOne({
                email: req.body.email,
            })
            .then((results) => {
                if (results) {
                    if (!bcrypt.compareSync(password, results.password)) {
                        res.statusMessage = "Incorrect data!";
                        return res.status(403).end();
                    }
                    let response = {
                        email: results.email,
                        nuserName: results.userName,
                        role: results.role,
                        id: results.id,
                    };
                    let token = jwt.sign(response, secret, {
                        expiresIn: "1h",
                    });
                    TokensController.newToken(token, results.id);
                    res.statusMessage = "Login sucess";
                    return res.status(200).send({
                        email: response.email,
                        role: response.role,
                        token: token,
                    });
                } else {
                    res.statusMessage = "User does not exist!!";
                    return res.status(400).end();
                }
            });
    }

    static googleLogin(req, res) {
        let {
            email,
            userName,
            googleId
        } = req.body;
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID
        )
        const ticket = oAuth2Client.verifyIdToken({
            idToken: req.body.idToken
        }).then(response => {
            console.log("Se verifico el token")
            const database = new Database("users");
            database.findOne({
                email: req.body.email
            }).then((result) => {
                let token = jwt.sign(result, secret, {
                    expiresIn: "1h",
                });
                TokensController.newToken(token, result.id);
                return res.status(200).send({
                    email: result.email,
                    role: result.role,
                    token: token,
                    userName: result.userName,
                }).end();
            }).catch(response => {
                let id = "" + Math.random().toString(36).substr(2, 9); //Se crea el id
                let user = {
                    email: req.body.email,
                    userName: req.body.userName,
                    role: "student",
                    id: id,
                    googleId: req.body.googleId,
                }
                database.insertOne({ //Funcion insertOne que se encuentra en 'models' se manda a llamar
                    email: user.email,
                    userName: user.userName,
                    role: "student",
                    id: user.id,
                    googleId: user.googleId,
                }).then(response => {
                    console.log(user)
                    let token = jwt.sign(user, secret, {
                        expiresIn: "1h",
                    });
                    TokensController.newToken(token, user.id);
                    return res.status(200).send({
                        email: user.email,
                        role: user.role,
                        token: token,
                        userName: user.userName,
                    }).end();
                })
            });

        });
    }

    static findOneAndUpdate(req, res) {
        const database = new Database("users");
        let codepass = bcrypt.hashSync(req.body.password, 10);
        const update = {
            $set: {
                email: req.body.email,
                password: codepass,
                userName: req.body.userName,
            },
        };

        database
            .findOneAndUpdate({
                    id: req.query.id,
                },
                update
            )
            .then((user) => {
                if (!user) return res.status(404).send("User dosen´t founded");
                res.status(200).send("Update user");
            });
    }

    static getUsers(req, res) {
        const database = new Database("users");
        if (!req.query.id) {
            database.find().toArray((err, results) => {
                if (err) {
                    res.status(400).send("Database error");
                }

                if (results.length === 0) {
                    res.status(400).send("Users not found");
                } else {
                    res.status(200).send(results);
                }
            });
        } else {
            database
                .findOne({
                    id: req.id,
                })
                .then((results) => {
                    if (results) {
                        res.status(200).send(results);
                    } else {
                        res.status(400).send("Users not found");
                    }
                })
                .catch((err) => {});
        }
    }

    static deleteUser(req, res) {
        const database = new Database("users");
        database
            .findOneAndDelete({
                id: req.params.id,
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send("User not founded");
                }
                StudentController.delete(req.params.id);
                TeacherController.delete(req.params.id);
                res.status(200).send("Delete user");
            });
    }

    static photo(req, res) {}

    static createphoto(req, res) {}
}

module.exports = UsersController;