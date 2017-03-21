//const MongoClient = require('mongodb').MongoClient;
const{MongoClient, ObjectID} = require('mongodb'); // Using object destructurin of ES6, same as above code

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
        text: 'Something to undo',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name: 'Abdurahman Gugssa',
        age: 33,
        location: 'Belleve, WA'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user');
        }

        console.log(result.ops[2]._id.getTimestamp());
    });

    db.close();
});