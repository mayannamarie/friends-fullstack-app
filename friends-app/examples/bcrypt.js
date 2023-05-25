const bcrypt = require('bcrypt')

//REGISTER - USE HASH
bcrypt.hash(in_password, 10,(err, hash) => {
    console.log(err);
    console.log(hash);
});
//LOGIN - USE COMPARE
hashedPassword = "$2b$10$BvIdlzH41I0/ypLD.7G3cukarFX/tAw6cSnaPYz8yuw7r/mFfcNZK";
//to check if a pw is valid it has to match, so take plain text and algorithm tells u if its a match
bcrypt.compare(in_password, hashedPassword, (err, isMatch) => {
    console.log(isMatch);
})