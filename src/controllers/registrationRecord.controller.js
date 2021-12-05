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
            let filter = [
                {
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
                        console.log(response);
                        res.status(200).send(response);
                    })
                    .catch(err => {});

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