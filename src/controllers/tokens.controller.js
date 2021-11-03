const Database = require('../models/database');
const bcrypt = require("bcrypt");
require('dotenv').config();

var today= new Date();

class tokensController{


    static newToken(token, id){
        const database = new Database('tokensControl');
        let hDate = new Date()
        let d = hDate.getDate();
        let m = hDate.getMonth()+1;
        let y = hDate.getFullYear();
        let fullDate = `${d}.${m}.${y}.`
        database.insertOne({
            token: token,
            id: id,
            date: fullDate
        }).then(response => {
            return 
        })
            .catch(error => {
            return 
        });
    }




}
module.exports = tokensController;