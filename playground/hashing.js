const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// var message = 'I am user number one';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'salting').toString()
// };

// // Assume someone tries to change the value here on the client by changing the id and 
// // send it back after re-hasing
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString(); 
// // NOTE: Since the salt is stored in the server, they don't have any way to know what the salt is

// var resultHash = SHA256(JSON.stringify(token.data) + 'salting').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');
// }

// All the above code can be taken care of by the 'JSON Web Token (JWT)' module

// jwt.sign takes the object (i.e. in this case the data) and it sign it and creates the hash and returns 
// the token value. token is the value we gonna send back to the user when they signup or login and it's also
// the value we gonna store in the tokens array
// var token = jwt.sign(data, '123abc');
// console.log(token);
// jwt.verify takes the token in jwt.sign and the 'secret' and makes sure the data was not manuplated
// Once we decode the data after the person makes the request with the token we can use that id to start
// actually doing the thing user wants to do (i.e. Creating, updating, deleting a todo etc...)
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$9uPRq.P3PW5VptPRow5D2eBHksoNDD1us0baWrqkys0PkSgRcazEe';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});
