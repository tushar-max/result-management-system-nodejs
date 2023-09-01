const Student = require('../models/Student');
const mongoose = require('mongoose');

exports.studentLogin = async (req, res) => {
    const notfound = false;
    res.render('./layout/studentlogin', { notfound });
}

exports.viewResult = async (req, res) => {
    try {
        console.log(req.body);
        const student = await Student.findOne({ RollNo: req.body.rollNo, Name: req.body.studentName });
        // const student =1;
        const notfound = false;
        if (student) {
            res.render('student/view', { student });
        }
        else {
            const notfound = true;
            res.render('./layout/studentLogin', { notfound });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.logout = async (req, res) => {
    teachersView = false;
    res.redirect('/');
}

exports.teacherLogin = async (req, res) => {
    if(teachersView){
        res.redirect('/resultdb');
    }
    const wrongCredentials = false;
    res.render('./layout/teacherlogin', { wrongCredentials });
}

exports.login = async (req, res) => {
    console.log(req.body);
    if (req.body.email === 'admin@teacher.com' && req.body.password === 'Tushar@123') {
        teachersView = true;
        res.redirect('/resultdb');
    }
    else {
        teachersView = false;
        const wrongCredentials = true;
        res.render('./layout/teacherlogin', { wrongCredentials });
    }
}