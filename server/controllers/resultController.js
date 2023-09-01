
const Student = require('../models/Student');
const mongoose = require('mongoose');



exports.resultdb = async (req, res) => {
    let perPage = 5;
    let page = req.query.page || 1;
    try {
        if(teachersView){
            const students = await Student.aggregate([
                {
                    $addFields: {
                        RollNo: {
                            $toInt: "$RollNo"
                        }
                    }
                },
                { $sort: { RollNo: 1 } }])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();
            const count = await Student.count();
            // console.log(students.length);
            res.render('./layout/resdb', {
                students,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        }
        else{
            res.render('./layout/resdb');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.homepage = async (req, res) => {
    res.render('./layout/home');
}

exports.addStudent = async (req, res) => {
    res.render('./layout/addStudent');
}


// Post / Create new Student
exports.postStudent = async (req, res) => {
    // console.log(req.body)
    const ifStudentExist = await Student.findOne({ RollNo: req.body.rollNo });
    if (!ifStudentExist) {
        const newStudent = new Student({
            Name: req.body.studentName,
            RollNo: req.body.rollNo,
            DOB: req.body.dob,
            Score: req.body.score
        });
        try {
            await Student.create(newStudent);
            res.redirect('/resultdb');
        } catch (error) {
            console.log(error);
            // alert("Some error occured");
        }
    }
    else {
        duplicate = true;
        res.redirect('/resultdb');
    }

}

exports.view = async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id });
        // const student =1;
        // console.log(student);
        res.render('student/view', { student });
    } catch (error) {
        console.log(error);
    }
}

exports.edit = async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id });
        res.render('student/edit', { student });
    } catch (error) {
        console.log(error);
    }
}

exports.editPost = async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, {
            Name: req.body.studentName,
            RollNo: req.body.rollNo,
            // DOB: req.body.dob,
            Score: req.body.score
            // Name: "req.body.studentName",
            // RollNo: "req.body.rollNo",
            // DOB: "req.body.dob",
            // Score: "req.body.score"
        });
        res.redirect('/resultdb');
    } catch (error) {
        console.log(error);
    }
}


exports.deleteStudent = async (req, res) => {
    try {
        await Student.deleteOne({ _id: req.params.id });
        res.redirect('/resultdb');
    } catch (error) {
        console.log(error);
    }
}