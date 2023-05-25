const mongoose = require('mongoose');

const { Schema } = mongoose;

const friendSchema = new Schema({
   
    first_name: {
        type: String,
        required: [ true, 'first name is required'],
        min: [4,'Must be at least 4'],
        max: 15
    },
    last_name: {
        type: String,
        required: [ true, 'last name is required'],
        min: [4,'Must be at least 4'],
        max: 15
    },
    address:[{
        street_no: String,
        city: String,
        country: String
    }],
    image: {
        type: String,
        required: [ true, 'image is required']
    }
});


//generate the model from the schema and export for use elsewhere
module.exports = mongoose.model('Friend', friendSchema)



