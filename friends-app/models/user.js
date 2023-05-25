//for REQ 2 - MODEL THIS OFF OF SONG SAME THING 
const mongoose = require('mongoose');

const { Schema } = mongoose //destructuring

const userSchema = new Schema({
    //OUR JOB HERE IS TO FILL OUT FIELDS NEEDED outlined IN DOCUMENT 
    //THEN THAT MODEL CAN START RUNNIG QUERIES TO THE DB

    first_name: {
        type: String,
        required: true,
        min: [3,'Must be at least 3'],
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        min: [3,'Must be at least 3'],
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [4,'Must be at least 4'],
        max: 255
    }
});


// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };


module.exports = mongoose.model('User', userSchema)