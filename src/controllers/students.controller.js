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

    static sign(req, res) {
        const database = new Database('students');
        let { id } = req.body;
        if ( !id) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let iDate = new Date()
        let d = iDate.getDate();
        let m = iDate.getMonth()+1;
        let y = iDate.getFullYear();
        
        database.insertOne({
            inscriptionDate: fullDate ,
            graduationDate: "",
            abscences: 0,
            totalClasses: 0,
            urlVideo: "",
            id: id
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
        const database = new Database('students');
        let codepass = bcrypt.hashSync(req.body.password, 10);
        const update = {$set:
            {
                graduationDate: req.body.graduationDate,
                abscences: req.body.abscences,
                totalClasses: req.body.totalClasses,
                urlVideo: req.body.urlVideo,
        }};
    
        database.findOneAndUpdate({ email: req.body.email }, update).then((user) => {
            if (!user) return res.status(404).send("User not found");
            res.send("Update user");
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
        const database = new Database('students');
        console.log(req.id)
        database.findOneAndDelete({id: req.params.id}).then((user) => {
            if (!user) return res.status(404).send("User dosen´t founded");
            res.send("Delete user");
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