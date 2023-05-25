var express = require('express')
var router = express.Router();
var validateToken = require('../../middleware/validateToken')

router.use((req, res, next) => {
    //res.append('Access-Control-Allow-Origin', ['*']);
    //res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.append('Access-Control-Allow-Headers', 'Content-Type,x-auth-token');
    next();
});

                   //DEFINE ANY SUB ROUTERS OF OUR API
//SONGS
var songsRouter = require('./songs');
router.use('/songs', songsRouter)
//USERS
var usersRouter = require('./users');
router.use('/users', usersRouter)
usersRouter.use(validateToken)
//FRIENDS
var friendsRouter = require('./friends');
friendsRouter.use(validateToken)
router.use('/friends', friendsRouter)

//OUR WELCOME ENDPOINT
router.get('/', (req, res) => {
    res.header("custom-header", "token")
    res.send('Welcome to our API!!! :)')
})

module.exports = router;
