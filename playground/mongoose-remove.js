
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove (you can delete by any matching param)
Todo.findByIdAndRemove({_id: '58dabb436323e636b85c4fb5'}).then((todo) => {
    console.log(todo);
});

//Todo.findByIdAndRemove
Todo.findByIdAndRemove('58dabb436323e636b85c4fb5').then((todo) => {
    console.log(todo);
});