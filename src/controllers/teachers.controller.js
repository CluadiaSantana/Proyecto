const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();

class TeacherController {
    static signUser(id, salary) {
        const database = new Database('students');

       let hDate = new Date()
       let d = hDate.getDate();
       let m = hDate.getMonth()+1;
       let y = hDate.getFullYear();
       let fullDate = `${d}.${m}.${y}.`;

        database.insertOne({
            id:id,
            hiringDate: fullDate ,
            students: [],
            salary: salary ,
            status: ""
        }).then(response => {
            return;
        })
            .catch(error => {
            return;
        });
    }

    static sign(req,res){
        
    }
}
module.exports = TeacherController;