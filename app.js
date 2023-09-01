require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride =require('method-override');
const connectDB = require('./server/config/db');
// const { teacherLogin } = require('./server/controllers/resultController');
const app=express();
const port = 5000 || process.env.port;

//Connect to db

connectDB();

app.use(express.urlencoded({extender:true}));
app.use(express.json());
app.use(methodOverride('_method'));
// Static files

app.use(express.static('public'));



// Templating Engine

app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine','ejs');


//Routes

app.use('/',require('./server/routes/student'));

// To Handle 404 error

app.get('*',(req,res)=>{
    res.status(404).render('404');
});

app.listen(port,()=>{
    console.log(`App Listening on port ${port}`)
});

// Some variables to inprove accessibility
global.duplicate=false;
global.teachersView=false;