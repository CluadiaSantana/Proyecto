const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { nextTick } = require('process');
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

    static getTeacherByid(req, res) {
        const database = new Database('teachers');
        console.log(req.query.id)
        database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    console.log('Resultados: ', results);
                    res.send(results);
    
                } else {
                    console.log('No teachers found!');
                }
            })
            .catch(err => {});
    }

    static getTeachers(req, res) {
        const database = new Database('teachers');
        if(!req.query.id){
            database.find().toArray((err, results) => {
                if(err) {
                    res.status(400).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Teachers not found');
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
                    console.log('No teachers found');
                }
            })
            .catch(err => {});
        }


    }

    
}

module.exports = TeacherController;