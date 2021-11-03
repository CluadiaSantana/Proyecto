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
        database.insertOne({
            year: y,
            numClasses:numClasses,
            studentId: studentId,
            teacherId: teacherId,
            weeklyHours: weeklyHours
        }).then(response => {
            res.statusMessage = "User created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "User already exist!";
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
    
        database.findOneAndUpdate({ studentId: req.query.studentId }, update).then((user) => {
            if (!user) return res.status(404).send("User not found");
            res.send("Update user");
          });
    }


    static getClasses(req, res) {
        const database = new Database('classes');
        if(!req.query.studentId || !req.query.teacherId){
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
            database.find({studentId: req.query.studentId , teacherId:req.query.teacherId}).toArray((err, results) => {
                if(err) {
                    res.status(400).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Students not found');
                } else {
                    res.send(results);
                }
            });

        }
    }

    static deleteClasses(req, res){
        const database = new Database('classes');
        database.findOneAndDelete({studentId: req.query.studentId , teacherId:req.query.teacherId}).then((user) => {
            if (!user) return res.status(404).send("User dosen´t founded");
            res.send("Delete user");
          });
    }


    
}

module.exports = ClassesController;