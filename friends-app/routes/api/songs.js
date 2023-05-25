var express = require('express')
var router = express.Router()

//import the Song model
const Song = require('../../models/song')

                //define endpoints for songs resource
//GET ALL SONGS
router.get('/', (req, res) => {
    // res.send('GET ALL SONGS ENDPOINT WAS REACHED');
    Song.find({}, (err, songs) => {          //to find all songs make the first para empty {},
                                            // () <- is the call back(returns u either the error or results)
        
        //handle if error occured
        if(err) {   //if error is truffy (came back with a value)
            console.log(err)
            res.status(500).send('An error occured')

        }
        console.log(songs)                   
        res.json(songs)     
    })                                      
})

//GET ONE SONG BY ID 
router.get('/:id', (req, res) => {
    //res.send(`GET ONE SONG ENDPOINT WAS REACHED AND THE ID is ${req.params.id}`);
    Song.findById(req.params.id, (err, song) => {
        if(err) {
            return res.status(400).send(`Error: ${err.message}`)
        }
        if(!song){  //handles if no song found
            return res.status(404).send()
        }
        res.send(song)
    })
    
   
})

//CREATE SONG
router.post('/', (req, res) => {
    // res.send(`CREATE SONG ENDPOINT WAS REACHED`);
    Song.create(req.body,  (err, savedSong) => {        //take body tat came from req and create a song from it
        console.log(savedSong)
        res.status(201).send()

    })          
})

//UPDATE SONG BY ID
router.put('/:id', (req, res) => {
    res.send(`UPDATE SONG ENDPOINT WAS REACHED AND THE ID is ${req.params.id}`)

    //FINISHHH THIS ONE 
})

//DELETE SONG BY ID
router.delete('/:id', (req, res) => {
    Song.deleteOne({ id: '6634ea00e6ed7d8285b596d6c' });
    // res.send(`DELETE SONG ENDPOINT WAS REACHED AND THE ID is ${req.params.id}`)

    //FINISH THIS ONE 

})



module.exports = router;