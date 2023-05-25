//this logiin model will only be used to validate
const mongoose = require('mongoose');

const { Schema } = mongoose //destructuring

const loginSchema = new Schema({
    //OUR JOB HERE IS TO FILL OUT FIELDS NEEDED outlined IN DOCUMENT 
    //THEN THAT MODEL CAN START RUNNIG QUERIES TO THE DB

    email: {
        type: String,
        required: [ true, 'Email Address is required'],
        unique: true,
        validate: {
            validator: v => {
                return /[A-Za-z0-9.-]@[A-Za-z0-9.-]+\.[a-z]/.test(v)
            },
            message: "Must be a valid email address"
        }
    },
    password: {
        type: String,
        required: [ true, 'Password is required'],
        maxlength: 255
    }
});


// var validateEmail = function(email)  {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

module.exports = mongoose.model('Login', loginSchema)