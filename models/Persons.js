const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: false
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})


// Create Model of Person

const Person = mongoose.model('Person', personSchema);
console.log(Person)

module.exports = Person;