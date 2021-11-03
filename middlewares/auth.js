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
                let reg = [];
                reg.push(decoded.rol);
                reg.push(decoded.email);
                reg.push(decoded.id);
                res.reg = reg;
                next();
            }
        })
    }else{
        res.status(401).send({error: "falta token"})
    }

    
}

module.exports = {authPer}