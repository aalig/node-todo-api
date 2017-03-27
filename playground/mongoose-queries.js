const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '58d98172e5ffff11480204b511';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

Todo.find({
    // Mongoose changes the id to ObjectId and no need modify it
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by Id', todo);
}).catch((err) => console.log(err));
