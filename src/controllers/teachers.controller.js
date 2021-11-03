const Database = require('../models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { nextTick } = require('process');
require('dotenv').config();

class TeacherController {
    static signUser(id, salary) {
        const database = new Database('teachers');

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

    static sign(req, res) {
        const database = new Database('teachers');
        let id  = req.body.id;
        if ( !id) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let iDate = new Date()
        let d = iDate.getDate();
        let m = iDate.getMonth()+1;
        let y = iDate.getFullYear();
        let fullDate = `${d}.${m}.${y}.`;
        database.insertOne({
            id:id,
            hiringDate: fullDate ,
            students: [],
            salary: 0 ,
            status: ""
        }).then(response => {
            res.statusMessage = "User created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "User already exist!";
            return res.status(400).end();
        });
    }

    static findOneAndUpdateStudent(req, res){
        const database = new Database('teachers');
        const update = {$set:
            {
                students: req.body.students,
                salary: req.body.salary ,
                status: req.body.status
        }};
    
        database.findOneAndUpdate({ id: req.query.id }, update).then((user) => {
            if (!user) return res.status(404).send("User not found");
            res.send("Update user");
          });
    }


    static getStudents(req, res) {
        const database = new Database('teachers');
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
                    console.log('Results: ', results);
                    res.send(results);
    
                } else {
                    console.log('Student not Found');
                }
            })
            .catch(err => {});
        }


    }

    static deleteStudent(req, res){
        const database = new Database('teachers');
        console.log(req.id)
        database.findOneAndDelete({id: req.params.id}).then((user) => {
            if (!user) return res.status(404).send("User dosen´t founded");
            res.send("Delete user");
          });
    }

    static delete(id){
        const database = new Database('teachers');
        console.log(id);
        database.findOneAndDelete({id: id})
        return;
    }

    
}

module.exports = TeacherController;