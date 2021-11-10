const Database = require('../models/database');



class StudentController {
    static signUser(id, name) {
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
            studentId: id,
            name: name
        }).then(response => {
            
            return;
        })
            .catch(error => {
            return;
        });
    }

    static sign(req, res) {
        const database = new Database('students');
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
            inscriptionDate: fullDate ,
            graduationDate: "",
            abscences: 0,
            totalClasses: 0,
            urlVideo: "",
            id: id
        }).then(response => {
            res.statusMessage = "student created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "student alredy exist!";
            return res.status(400).end();
        });
    }

    static findOneAndUpdateStudent(req, res){
        const database = new Database('students');
        const update = {$set:
            {
                graduationDate: req.body.graduationDate,
                abscences: req.body.abscences,
                totalClasses: req.body.totalClasses,
                urlVideo: req.body.urlVideo,
        }};
    
        database.findOneAndUpdate({ id: req.query.id }, update).then((user) => {
            if (!user) return res.status(404).send("student not found ");
            res.status(200).send("Update student");
          });
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
                    res.status(200).send(results);
                }
            });
        }else{
            database.findOne({id: req.query.id})
            .then(results => {
                if(results) {
                    res.status(200).send(results);
    
                } else {
                    res.status(400).send('Students not found');
                }
            })
            .catch(err => {});
        }


    }

    static deleteStudent(req, res){
        const database = new Database('students');
        database.findOneAndDelete({id: req.params.id}).then((user) => {
            if (!user) return res.status(404).send("Students not found");
            res.status(200).send("Delete student");
          });
    }

    static delete(id){
        const database = new Database('students');
        console.log(id);
        database.findOneAndDelete({id: id})
        return;
    }

}
module.exports = StudentController;