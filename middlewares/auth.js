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
                req.role = payload.role;
                req.id=payload.id;
                next();
            }
        })
    }else{
        res.status(401).send({error: "falta token"})
    }

    
}

function adminValidation(req,res, next){
    const role = req.role;
    console.log(role);
    if(role == "Admin"){
        next();
    }else{
          res.status(401).send({error:"unauthorized user"})
    }
}

function teacherValidation(req,res, next){
    const role = req.role;

    if(role == "teacher" || role == "Admin"){
        next();
    }else{
          res.status(401).send({error:"unauthorized user"})
    }
}

module.exports = {authPer , adminValidation, teacherValidation}