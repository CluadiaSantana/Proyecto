const Database = require('../models/database');
require('dotenv').config();


class StudentController {
    static signUser(id) {
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

    static getStudentByid(req, res) {
        const database = new Database('students');
        console.log(req.query.id)
        database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    console.log('Resultados: ', results);
                    res.send(results);
    
                } else {
                    console.log('Student not found!');
                }
            })
            .catch(err => {});
    }

    static getStudents(req, res) {
        const database = new Database('students');
        if(!req.query.id){
            database.find().toArray((err, results) => {
                if(err) {
                    res.status(400).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Students not found');
                } else {
                    res.send(results);
                }
            });
        }else{
            database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    console.log('Resultados: ', results);
                    res.send(results);
    
                } else {
                    console.log('Student not Found');
                }
            })
            .catch(err => {});
        }


    }



}
module.exports = StudentController;