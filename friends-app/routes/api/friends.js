var express = require('express')
var router = express.Router()


//import the Friend model
const Friend = require('../../models/friend')
var validateToken = require('../../middleware/validateToken');
//router.use(validateToken);


//define endpoints for friends resource
//GET ALL friends
router.get('/', (req, res) => {
    // res.send('GET ALL FRIENDS ENDPOINT WAS REACHED');
    Friend.find({}, (err, friends) => {          //to find all friends make the first para empty {},
        // () <- is the call back(returns u either the error or results)
        //handle if error occured
        if (err) {   //if error is truffy (came back with a value)
            console.log(err)
            res.status(500).send('An error occured')
        } else if (!friends) {
            res.status(404).send('No friends')
        }
        console.log(friends)
        res.json(friends)
    })
})

//GET ONE FRIEND BY ID 
router.get('/:id', (req, res) => {
    //res.send(`GET ONE FRIEND ENDPOINT WAS REACHED AND THE ID is ${req.params.id}`);

    Friend.findById(req.params.id, (err, friend) => {
        if (err) {
            return res.status(400).send(`Error: ${err.message}`)
        }
        if (!friend) {  //handles if no song found
            return res.status(404).send()
        }
        return res.json(friend)
    })
})

//CREATE A FRIEND
router.post('/create', (req, res) => {   //for createform we have to send along a token as a header 
    console.log("running");

    //create an instance of the friend model
    const friend = new Friend(req.body)
    friend.validate((error) => {  //if validate is good errror should come back as null
        // console.log(error);
        if (error) {
            console.log("ERRORS YES")
            //we have validation errors.. respond with details
            return res.status(422).send(error);
        }
        console.log("ERRORS NO")


        // res.send(`CREATE SONG ENDPOINT WAS REACHED`);
        Friend.create(req.body, (err, newFriend) => {        //take body that came from req and create a song from it
            console.log(newFriend);
            if (err) {
                console.log(err)
                return res.status(422).send({ serverMessage: "Invalid Creation" });
            }
            res.status(201).send("Creation Successful")

        })
    })
});


//UPDATE FRIEND BY ID - PORT 5000 SERVER
router.put('/:id', (req, res) => {
    //res.send(`UPDATE FRIEND ENDPOINT WAS REACHED AND THE ID is ${req.params.id}`)

    Friend.updateOne({ _id: req.params.id }, req.body, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
})

//DELETE FRIEND BY ID
router.delete('/:id', (req, res) => {
    console.log("DELETE RAN");

    Friend.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
            res.status(404).send("error removing user");
        }
        else {
            console.log("Removed User : ", docs);
            res.status(200).send("Removed user");
        }
    });

})

module.exports = router;