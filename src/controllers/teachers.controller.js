const Database = require('../models/database');
const { nextTick } = require('process');
const { response } = require('express');


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
            status: "",
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
            res.statusMessage = "Teacher created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "Teacher already exist!";
            return res.status(400).end();
        });
    }

    static findOneAndUpdateTeacher(req, res){
        const database = new Database('teachers');
        const update = {$set:
            {
                students: req.body.students,
                salary: req.body.salary ,
                status: req.body.status
        }};
    
        database.findOneAndUpdate({ id: req.query.id }, update).then((user) => {
            if (!user) return res.status(404).send("Teacher not found");
            res.status(200).send("Update teacher");
          });
    }


    static getTeachers(req, res) {
        const database = new Database('teachers');
        if(!req.query.id){
        }
            let filter=[{$lookup:
                {
                      from: "users",
                      localField: "id",
                      foreignField: "id",
                      as: "user"
                  }
                 },
                 {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user",0 ] }, "$$ROOT" ] } }
                 },
                 { $project: { user: 0 } }
                ]
            database.aggregate(filter).toArray().then(response=>{
                     console.log(response);
                     res.status(200).send(response);
                 })
            .catch(err => {});
        }


    static deleteTeachers(req, res){
        const database = new Database('teachers');
        console.log(req.id)
        database.findOneAndDelete({id: req.params.id}).then((user) => {
            if (!user) return res.status(404).send("Teacher not founded");
            res.send("Delete teacher");
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