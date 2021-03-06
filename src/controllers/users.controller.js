const Database = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TokensController = require("../controllers/tokens.controller");
const StudentController = require("../controllers/students.controller");
const TeacherController = require("../controllers/teachers.controller");
const path = require('path');
const fs = require('fs');

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
                photoName: '16363.png',
                noSizeRecord: 0,
                noSizeCancel: 0,
                noSizeConfirm: 0,
                noSizeComplete: 0
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
                        userName: results.userName,
                        role: results.role,
                        id: results.id,
                        photoName: results.photoName
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
                        userName: response.userName,
                        photoName: results.photoName,
                        id: results.id
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
                    noSizeRecord: 0,
                    noSizeCancel: 0,
                    noSizeConfirm: 0,
                    noSizeComplete: 0
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
                        photoName: '16363.png',
                        id: user.id
                    }).end();
                })
            });

        });
    }






    static findOneAndUpdate(req, res) {
        console.log(req.body.email)
        const database = new Database("users");
        let update;
        if (req.body.password) {
            let codepass = bcrypt.hashSync(req.body.password, 10);
            update = {
                $set: {
                    email: req.body.email,
                    password: codepass,
                    userName: req.body.userName,
                    role: req.body.role,
                },
            };
        } else {
            update = {
                $set: {
                    email: req.body.email,
                    userName: req.body.userName,
                    role: req.body.role
                },
            }
        }
        database
            .findOneAndUpdate({
                    id: req.query.id,
                },
                update
            )
            .then((user) => {
                if (!user) return res.status(404).send("User doesn??t found");
                res.status(200).end;
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
                    id: req.query.id,
                })
                .then((results) => {
                    if (results) {
                        res.status(200).send(results);
                    } else {
                        res.status(400).send("User not found");
                    }
                })
                .catch((err) => {});
        }
    }

    static getMyUsers(req, res) {
        const database = new Database("users");
        database
            .findOne({
                id: req.id,
            })
            .then((results) => {
                if (results) {
                    res.status(200).send(results);
                } else {
                    res.status(400).send("User not found");
                }
            })
            .catch((err) => {});

    }

    static deleteUser(req, res) {
        const database = new Database("users");
        database
            .findOneAndDelete({
                id: req.params.id,
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send("User not found");
                }
                StudentController.delete(req.params.id);
                TeacherController.delete(req.params.id);
                res.status(200).send("User Deleted");
            });
    }

    static profile(req, res) {
        res.sendFile(path.resolve(__dirname, '..', '..', 'files', 'profile', '' + req.params.photoName)).then(resp => {
            return res.status(200);
        });
    }

    static createProfile(req, res) {
        const file = req.file;
        if (!file) {
            return res.status(404).end()
        }
        res.send(file);
    }

    static updatePhoto(id, photoName) {
        const database = new Database("users");
        const update = {
            $set: {
                photoName: photoName
            },
        };

        database
            .findOneAndUpdate({
                    id: id,
                },
                update
            )
            .then((user) => {
                console.log("se uptade")
                return
            });
    }

    static updateSize(id,size){
        const database = new Database("users");
        if(size=="all"){
            let update = {
                $set: {
                    noSizeRecord: 0,
                    noSizeCancel: 0,
                    noSizeConfirm: 0,
                    noSizeComplete: 0
                },
            };
        }
        else{
            let update="";
            database.findOne({id: id}).then(user=>{
                if(size=="noSizeRecord"){
                    update = {
                        $set: {
                            noSizeRecord: user.noSizeRecord+1
                        },
                    };
                }
                if(size=="Cancelada"){
                    update = {
                        $set: {
                            noSizeCancel: user.noSizeCancel+1
                        },
                    };
                }
                if(size=="Confirmada"){
                     update = {
                        $set: {
                            noSizeConfirm: user.noSizeConfirm+1
                        },
                    };
                }
                if(size=="Completada"){
                     update = {
                        $set: {
                            noSizeComplete: user.noSizeComplete+1
                        },
                    };
                }
                database.findOneAndUpdate({
                    id: id,
                },
                update
            )
            })
        }
    }

}

module.exports = UsersController;