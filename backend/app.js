const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts')


const app = express();
// mongo pwd : QQi0NUGJNk3Hk0T5
mongoose.connect("mongodb+srv://AnkBan:QQi0NUGJNk3Hk0T5@mean-project.phgn2h7.mongodb.net/mean-project?retryWrites=true&w=majority")
.then(()=>{
    console.log('connected to mongoDB!');
})
.catch(err=>{
    console.log('connection failed: ' + err.message);
});
app.use(bodyParser.json());


// seting header to link between http://localhost:4200 and http://localhost:3000/api/posts
app.use((req, res, next)=>{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
next();
});

app.use("/api/posts", postRoutes);

module.exports = app;