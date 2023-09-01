const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    RollNo:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    Score:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Student', StudentSchema);