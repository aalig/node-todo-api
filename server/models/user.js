const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// We can add a method to a UserSchema but not on the model and hence the restructuring
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Instance methods
// Instances of Models are documents. Documents have many of their own built-in instance methods. 
// We may also define our own custom document instance methods too.
// Arrow functions do not bind the 'this' keyword, so we will be using the regular function because the 
// 'this' keyword will store the individual document
userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access= 'auth';

    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};


// Override a method to update exactly how mangoose hanldes certain things
// This method determines what exactly gets sent back when a mongoose model is converted into a JSON value
userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// Schema.statics object is like a Schema.methods but everything you add onto it turns into a model method as 
// opposed to an instance method
userSchema.statics.findByToken = function (token) {
    // Model methods gets called with the model as the 'this' binding
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }

        // bcrypt.compare only supports callbacks and not promises. So, to keep using Promises we will return a new Promise
        return new Promise ((resolve, reject) => {
           bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
           });
        });
    });
};

// Run some code before a given event (in this case before the 'save' event)
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {User};