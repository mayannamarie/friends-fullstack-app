const jwt = require('jsonwebtoken');

//generate a json web token 
const payload = {
    email: "w0459469@nscc.ca"
}
const secretKey = "mylittlesecret";
// jwt.sign(payload, secretKey, {}, (err, token) => {
//     console.log(token)
// })

jwt.verify(sampleToken, secretKey, (err, payload) => {
    if(err) {
        console.log(err.message)
        return
    } 
    console.log(payload)
})