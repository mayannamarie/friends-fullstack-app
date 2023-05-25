// a middleware is jsut a function with a certain no. of parameters 
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    //check for the existence of a token in the REQUEST HEADER called x-auth-token
    const token = req.headers["x-auth-token"];        

    //if it doesn't exist, send response 401 unauthorized
    if (!token) {
        return res.status(401).send("Token doesn't exist");
    }
    try {
        //if it does exist, make sure its valid..if not send 401, otherwise 

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log(err.message)

                return res.status(401).send("Access is Denied");
            }
            console.log(decoded)
            res.status(201).send('Succesfully Verified Token')

        })

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    //otherwise allow to proceed on (next)

    return next();
};

module.exports = validateToken;