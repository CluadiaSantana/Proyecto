const Database = require('../models/database');

class RegistrationRecordController {

    static sign(req, res) {
        const database = new Database('registrationRecord');
        let {studentId, teacherId, numClasses, weeklyHours, date, hour }  = req.body;
        if ( !studentId || !teacherId) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        database.insertOne({
            claseId: response.claseId,
            date: date,
            hour: hour,
            status :"Active"
        }).then(response => {
            res.statusMessage = "Record created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "Record already exist!";
            return res.status(400).end();
        });
    }

    static findOneAndUpdateRegister(req, res){
        const database = new Database('registrationRecord');
        const update = {$set:
            {
                hour: req.body.hour,
                status: req.body.status
        }};
    
        database.findOneAndUpdate({studentId: req.query.studentId , teacherId:req.query.teacherId}, update).then((user) => {
            if (!user) return res.status(404).send("Record not found");
            res.status(200).send("Update Record");
          });
    }


    static getRegistration(req, res) {
        const database = new Database('registrationRecord');
        let query;
        if(req.role== "Admin"){
            query={};
        }else if(req.role=="student")
        {
            query={studentId: req.id}
        } else if(req.role=="teacher"){
            query={teacherId: req.id}
        }
            database.find(query).toArray((err, results) => {
                if(err) {
                    res.status(400).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Record not found');
                } else {
                    res.status(200).send(results);
                }
            });

    }

    static deleteRegistration(req, res){
        const database = new Database('registrationRecords');
        database.findOneAndDelete({studentId: req.query.studentId , teacherId:req.query.teacherId}).then((user) => {
            if (!user) return res.status(404).send("Record not founded");
            res.status(200).send("Delete records");
          });
    }


    
}

module.exports = RegistrationRecordController;