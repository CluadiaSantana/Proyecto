const { query } = require('express');
const Database = require('../models/database');

class ClassesController {

    static sign(req, res) {
        const database = new Database('classes');
        let {studentId, teacherId, numClasses, weeklyHours }  = req.body;
        if ( !studentId || !teacherId) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let hDate = new Date()
        let y = hDate.getFullYear();
        let id = "" + Math.random().toString(36).substr(2, 9); //Se crea el id
        database.insertOne({
            year: y,
            numClasses:numClasses,
            studentId: studentId,
            teacherId: teacherId,
            weeklyHours: weeklyHours,
            claseId: id
        }).then(response => {
            res.statusMessage = "Class created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "Class already exist!";
            return res.status(400).end();
        });
    }

    static findOneAndUpdateClass(req, res){
        const database = new Database('classes');
        const update = {$set:
            {
                numClasses: req.body.numClasses,
                weeklyHours: req.body.weeklyHours
        }};
    
        database.findOneAndUpdate({studentId: req.query.studentId , teacherId:req.query.teacherId}, update).then((user) => {
            if (!user) return res.status(404).send("Class not found");
            res.status(200).send("Update Class");
          });
    }


    static getClasses(req, res) {
        const database = new Database('classes');
        let query;
        if(req.role== "Admin"){
            if(req.query.studentId && req.query.teacherId){
                query={studentId:req.query.studentId, teacherId: req.query.teacherId};
            }else{
                query={};
            }
        }else if(req.role=="student")
        {
            query={studentId: req.id}
        } else if(req.role=="teacher"){
            if(req.query.studentId){
                query={teacherId: req.id, studentId:req.query.studentId}
            }else{
                query={teacherId: req.id}
            }
            
        }
            database.find(query).toArray((err, results) => {
                if(err) {
                    res.status(400).send('Database error');
                }
                if(results.length === 0) {
                    res.status(400).send('Class not found');
                } else {
                    res.status(200).send(results);
                }
            });

    }

    static deleteClasses(req, res){
        const database = new Database('classes');
        database.findOneAndDelete({studentId: req.query.studentId , teacherId:req.query.teacherId}).then((user) => {
            if (!user) return res.status(404).send("Class not founded");
            res.status(200).send("Delete Class");
          });
    }


    
}

module.exports = ClassesController;