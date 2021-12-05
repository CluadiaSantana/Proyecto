const Database = require('../models/database');



class StudentController {
    static signUser(id) {
        const database = new Database('students'); //Utilizara la collection students

        let iDate = new Date()
        let d = iDate.getDate();
        let m = iDate.getMonth() + 1; //Se crea la fecha
        let y = iDate.getFullYear();
        let fullDate = `${d}.${m}.${y}.`;

        database.insertOne({
                inscriptionDate: fullDate,
                graduationDate: "",
                abscences: 0, //Se pasa la data que se insertara con la funcion insertOne()
                totalClasses: 0,
                urlVideo: "",
                studentId: id,
                teacher: "",
                photo: ""
            }).then(response => {

                return;
            })
            .catch(error => {
                return;
            });
    }

    static sign(req, res) {
        const database = new Database('students');
        let id = req.body.id;
        if (!id) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let iDate = new Date()
        let d = iDate.getDate();
        let m = iDate.getMonth() + 1;
        let y = iDate.getFullYear();
        let fullDate = `${d}.${m}.${y}.`;
        database.insertOne({
                inscriptionDate: fullDate,
                graduationDate: "",
                abscences: 0,
                totalClasses: 0,
                urlVideo: "",
                id: id,
                teacher: "",
                photo: ""
            }).then(response => {
                res.statusMessage = "student created correctly!";
                return res.status(201).end();
            })
            .catch(error => {
                res.statusMessage = "student alredy exist!";
                return res.status(400).end();
            });
    }

    static findOneAndUpdateStudent(req, res) {
        const database = new Database('students');
        const update = {
            $set: {
                graduationDate: req.body.graduationDate,
                abscences: req.body.abscences,
                totalClasses: req.body.totalClasses,
                urlVideo: req.body.urlVideo,
            }
        };

        database.findOneAndUpdate({
            id: req.query.id
        }, update).then((user) => {
            if (!user) return res.status(404).send("student not found ");
            res.status(200).send("Update student");
        });
    }


    static getStudents(req, res) {
        const database = new Database('students');
        let filter = [{
                $lookup: {
                    from: "users",
                    localField: "id",
                    foreignField: "id",
                    as: "user"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{
                            $arrayElemAt: ["$user", 0]
                        }, "$$ROOT"]
                    }
                }
            },
            {
                $project: {
                    user: 0
                }
            }
        ]
        if (req.role == "Admin") {
            if (req.query.id) {
                console.log(req.query.id);
                filter.push({
                    $match: {
                        "userName": req.query.userName
                    }
                })
            }
        } else {
            if (req.query.userName) {
                console.log(req.query.userName);
                filter.push({
                    $match: {
                        $and: [{
                            "teacher": req.id
                        }, {
                            "userName": req.query.userName
                        }]
                    }
                })
            } else {
                filter.push({
                    $match: {
                        "teacher": req.id
                    }
                })
            }

        }
        //console.log(filter);

        database.aggregate(filter).toArray().then(response => {
                console.log(response);
                res.status(200).send(response);
            })
            .catch(err => {});
    }

    static deleteStudent(req, res) {
        const database = new Database('students');
        database.findOneAndDelete({
            id: req.params.id
        }).then((user) => {
            if (!user) return res.status(404).send("Students not found");
            res.status(200).send("Delete student");
        });
    }

    static delete(id) {
        const database = new Database('students');
        console.log(id);
        database.findOneAndDelete({
            id: id
        })
        return;
    }

}
module.exports = StudentController;