const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();

class StudentController {
    static sign(id) {
        const database = new Database('students');

       let iDate = new Date()
       let d = iDate.getDate();
       let m = iDate.getMonth()+1;
       let y = iDate.getFullYear();
       let fullDate = `${d}.${m}.${y}.`;
       
        database.insertOne({
            inscriptionDate: fullDate ,
            graduationDate: "",
            abscences: 0,
            totalClasses: 0,
            urlVideo: "",
            id: id
        }).then(response => {
            
            return;
        })
            .catch(error => {
            return;
        });
    }
}