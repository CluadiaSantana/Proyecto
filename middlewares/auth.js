const jwt = require('jsonwebtoken');
require('dotenv').config();
let secret = process.env.JWTSECRET;

function authPer(req,res,next){
    let token= req.headers["x-auth"];
    if(token){
        jwt.verify(token, secret, (err, payload)=>{
            if(err){
                res.status(401).send({error: "Token no válido"})   
            }else{
                req.rol = payload.rol;
                next();
            }
        })
    }else{
        res.status(401).send({error: "falta token"})
    }

    
}

function adminValidation(req,res, next){
    const rol = req.rol;
    console.log(rol);
    if(rol == "Admin"){
        next();
    }else{
          res.status(401).send({error:"unauthorized user"})
    }
}

function teachetValidation(req,res, next){
    const rol = req.rol;

    if(rol == "teacher" || rol == "Admin"){
        next();
    }else{
          res.status(401).send({error:"unauthorized user"})
    }
}

module.exports = {authPer , adminValidation, teachetValidation}