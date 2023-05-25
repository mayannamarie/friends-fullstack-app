const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema(
    { 
        title: String, 
        artist: String,
        releaseYear: Number,
        genres: [ String],
        ratings: [ Number ]   
    }
);



// const Song = mongoose.model('Song', songSchema);
// module.exports = Song;  //shorter way of doing it below

//generate the model from the schema and export for use elsewhere
module.exports = mongoose.model('Song', songSchema)


























// const foo = {
//     name: "foo",
//     age: 123,
//     details: {
//         value: 34356
//     }
// }
//const {details, name, age } = foo  //example of detructuring { xxx } instead of below 
// const details = foo.details     ^ same thing as destructing above
// const name = foo.name
// const age = foo.age 

//destructuring - schema is being pulled out (a smaler object part)of mongoose (big object)
//schema exist in mongoose so desteucturing is taking that part out
