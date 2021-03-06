const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const swaggerJsDoc= require('swagger-jsdoc');
const swaggerUI= require('swagger-ui-express');
const MongoClient= require('mongodb').MongoClient;
const Database = require('./src/models/database');
const apiRoutes = require('./src/routes/index');
const { log } = require("./middlewares/logs");
const socketIo= require('socket.io');
const cors= require('cors');
const UsersController = require('./src/controllers/users.controller');



app.use(cors({ origin: "*" }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/files/profile',express.static(path.join(__dirname, 'files','profile')));

if(process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}


let database;
const port = process.env.PORT;

const swaggerOptions ={
    swaggerDefinition: {
        info: {
            title: 'Proyecto 3ra entrega CRUDS', 
            version: '1.0.0',
            despcription: 'Practica 3 Documentacion de Api', 
            server: ['http://localhost:'+port],
            contact:{
                name:'Santana, Montemayor, Romo',
                email: ''
            }
        },
        basePath: "/",
        components: {
            securitySchemes: {
                bearerAuth: {
                type: "apiKey",
                in: "header",
                bearerFormat: "JWT",
                name: 'x-auth'
                }
            }
        },
        openapi: "3.0.0",
        },
    apis: [ 'src/routes/index.js',  'src/routes/users.js', 'src/routes/students.js', 'src/routes/teachers.js', 'src/routes/tokens.js', 'src/routes/classes.js','src/routes/records.js'],
    };


app.use(log);
app.use(express.json());
app.use(router);
app.use('/', apiRoutes);
app.use('/auth', require('./src/routes/auth'))


const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui',swaggerUI.serve, swaggerUI.setup(swaggerDocs));

MongoClient.connect(process.env.MONGO_URL,{
    useUnifiedTopology: true
}, function(err,client){
    if(err){
        console.log('Failed to connect to MongoDB');
    }else{
        console.log('Se conecto a la base de datos');
        const database=client.db();
        Database.setDatabase(database);
        //console.log(database);
        const server = app.listen(port,()=>{
            console.log('App is listening in port '+port)
        });
        const io= socketIo(server,{
            cors:{
                origin: '*',
                methods: ['POST','PUT'],
                allowedHeaders: ["x-auth"],
                credentials: true
            }
        });
        io.on('connection', socket=>{
            console.log("Alguien se conecto"); 
            socket.on('disconnect',()=>{
                console.log('Se ha desconectado');
            })
            socket.on('newRecord',(data)=>{
                console.log("nuevo registro para alumno", data);
                UsersController.updateSize(data.id,"noSizeRecord");
                io.emit('pushRecord',data);
            });
            socket.on('newNotification',(data)=>{
                console.log("nuevo registro para alumno", data);
                UsersController.updateSize(data.id,data.name);
                io.emit('Notification',data);
            })
        });
    }
});