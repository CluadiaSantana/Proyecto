const Database = require('../models/database');
require('dotenv').config();

class StudentController {
    static sign(id) {
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
            salary: 1 ,
            status: ""
        }).then(response => {
            
            return;
        })
            .catch(error => {
            return;
        });
    }
}