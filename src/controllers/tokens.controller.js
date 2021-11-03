const Database = require('../models/database');



var today= new Date();

class TokensController{


    static newToken(token, id){
        const database = new Database('tokensControl');
        let hDate = new Date()
        let d = hDate.getDate();
        let m = hDate.getMonth()+1;
        let y = hDate.getFullYear();
        let fullDate = `${d}.${m}.${y}.`
        database.insertOne({
            token: token,
            id: id,
            date: fullDate
        }).then(response => {
            return 
        })
            .catch(error => {
            return 
        });

    }

    static sgnToken(req,res){
        const database = new Database('tokensControl');
        let id  = req.query.id;
        let token= req.body.token;
        if ( !token, !id ) {
            res.statusMessage = "Data is missing!";
            return res.status(400).end();
        }
        let iDate = new Date()
        let d = iDate.getDate();
        let m = iDate.getMonth()+1;
        let y = iDate.getFullYear();
        let fullDate = `${d}.${m}.${y}.`;
        database.insertOne({
            token: token,
            id: id,
            date: fullDate
        }).then(response => {
            res.statusMessage = "Student created correctly!";
            return res.status(201).end();
        })
            .catch(error => {
            res.statusMessage = "Student already exist!";
            return res.status(400).end();
        });
    }

    static getToken(req, res) {
        const database = new Database('tokensControl');
        if(!req.query.id){
            database.find().toArray((err, results) => {
                if(err) {
                    res.status(403).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Tokens not found');
                } else {
                    res.status(200).send(results);
                }
            });
        }else{
            database.find({id: req.query.id})
            .toArray((err, results) => {
                if(err) {
                    res.status(403).send('Database error');
                }

                if(results.length === 0) {
                    res.status(400).send('Tokens not found');
                } else {
                    res.status(200).send(results);
                }
            });
        }

    }

    static deleteTokens(req, res){
        const database = new Database('tokensControl');
        database.findOneAndDelete({id: req.params.id}).then((token) => {
            if (!token) return res.status(404).send("User id not founded");
            res.status(200).send("Delete tokens");
          });
    }

}
module.exports = TokensController;