//const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb'); // Using object destructurin of ES6, same as above code

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // Delete many
    db.collection('Todos').deleteMany({
        text: 'Eat dinner'
    }).then((result) => {
        console.log(result);
    });

    // Delete one, deletes that matches the first criteria and stops
    db.collection('Todos').deleteOne({
        text: 'Delete One'
    }).then((result) => {
        console.log(result);
    });
    
    // Find one and delete
    db.collection('Todos').findOneAndDelete({
        completed: true
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});