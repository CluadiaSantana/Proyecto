const Database = require('../models/database');
const bcrypt = require("bcrypt");
require('dotenv').config();

var today= new Date();

class tokensController{


    static newToken(token, id){
        const database = new Database('tokensControl');
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