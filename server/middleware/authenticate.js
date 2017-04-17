var {User} = require('./../models/user');

// Define middleware function we use on our routes to make them private
// The actual route isn't gonna run until 'next' gets called inside of the middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        // Modify the request object
        // then we will be able to use the modified request object inside our routes
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports= {authenticate};