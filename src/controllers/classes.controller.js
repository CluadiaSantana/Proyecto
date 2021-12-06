const {
    query
} = require('express');
const Database = require('../models/database');

class ClassesController {

    static sign(req, res) {
        const database = new Database('classes');
        let {
            studentId,
            teacherId,
            numClasses,
            weeklyHours
        } = req.body;
        if (!studentId || !teacherId) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let hDate = new Date()
        let y = hDate.getFullYear();
        let id = "" + Math.random().toString(36).substr(2, 9); //Se crea el id
        database.insertOne({
                year: y,
                numClasses: numClasses,
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

    static findOneAndUpdateClass(req, res) {
        const database = new Database('classes');
        const update = {
            $set: {
                numClasses: req.body.numClasses,
                weeklyHours: req.body.weeklyHours
            }
        };

        database.findOneAndUpdate({
            studentId: req.query.studentId,
            teacherId: req.query.teacherId
        }, update).then((user) => {
            if (!user) return res.status(404).send("Class not found");
            res.status(200).send("Update Class");
        });
    }


    static getClasses(req, res) {
        const database = new Database('classes');
        let filter = [{
                $lookup: {
                    from: "users",
                    localField: "teacherId",
                    foreignField: "id",
                    as: "teacher"
                }
            },
            {

                $lookup: {
                    from: "users",
                    localField: "studentId",
                    foreignField: "id",
                    as: "student"
                }
            }
        ]
        if (req.role == "Admin") {
            console.log("admin");
            if (req.query.studentId) {
                filter.push({
                    $match: {
                        "studentId": req.query.studentId
                    }
                });
            }
            if (req.query.teacherId) {
                console.log(req.query.teacherId);
                filter.push({
                    $match: {
                        "teacherId": req.query.teacherId
                    }
                })
            }
        } else {
            if (req.role == "teacher") {
                filter.push({
                    $match: {
                        "teacherId": req.id
                    }
                })
            }
            if (req.query.studentId) {
                console.log(req.query.studentId);
                filter.push({
                    $match: {
                        "studentId": req.query.studentId
                    }
                });
            }
        }
        database.aggregate(filter).toArray().then(response => {
                //console.log(filter);
                res.status(200).send(response);
            })
            .catch(err => {});
    }


    static deleteClasses(req, res) {
        const database = new Database('classes');
        database.findOneAndDelete({
            studentId: req.query.studentId,
            teacherId: req.query.teacherId
        }).then((user) => {
            if (!user) return res.status(404).send("Class not founded");
            res.status(200).send("Delete Class");
        });
    }



}

module.exports = ClassesController;