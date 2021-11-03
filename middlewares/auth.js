const jwt = require('jsonwebtoken');
require('dotenv').config();
let secret = process.env.JWTSECRET;

function authPer(req,res,next){
    let token= req.headers["x-auth"];
    if(token){
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).send({error: "Token no válido"})   
            }else{
                
                req.rol(decoded.rol);
                req.email(decoded.email);
                req.id(decoded.id);
                next();
            }
        })
    }else{
        res.status(401).send({error: "falta token"})
    }

    
}

module.exports = {authPer}