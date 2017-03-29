var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// CRUD Operations
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // Check for valid id using isValid
    if (!ObjectID.isValid(id)) {       
        // If not valid send a 404 with empty body
        return res.status(404).send();
    }  

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => res.status(400).send());

});

app.delete('todos/:id', (req, res) => {
    var id = req.params.id;

    // Check for valid id using isValid
    if (!ObjectID.isValid(id)) {       
        // If not valid send a 404 with empty body
        return res.status(404).send();
    }  

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = { app };