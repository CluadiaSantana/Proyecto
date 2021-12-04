/*JWT
Compact, url safe means of representing claims to be tranferred between two parties. 
claims are encoded as JSON object
claim: piece of info asserted about a subject. represented as name/value pairs.
*/

const jwt = require('jsonwebtoken');
require('dotenv').config();
let secret = process.env.JWTSECRET;

/*JWT.SECRET
If callback is supplied, function acts asynchronously. secret can be a function that should fecth the secret or public key.
TOKEN: JsonWebToken string
SECRET: string or buffer containing either the secret for HMAC algorithms,
OR PEM encoded public key.

*/
function authPer(req,res,next){
    let token= req.headers["x-auth"];
    if(token){ 
        jwt.verify(token, secret, (err, payload)=>{
            if(err){
                res.status(401).send({error: "Invalid Token"})   
            }else{
                req.role = payload.role;
                req.id=payload.id;
                next();
            }
        })
    }else{
        res.status(401).send({error: "Token Missing!"})
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