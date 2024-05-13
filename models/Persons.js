const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
    }, 
    //Added for passport js authentication
    username: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only when new record or it is modified
    if(!person.isModified('password')) return next();   //that means if user does not doing anything with password then dont do hashing just let him go, by using next function

    try {
        //Hash password generate
        const salt = await bcrypt.genSalt(10); //It will generate salt for encryption, number jere here used for how many time he generate, 
        
        //hash the password
        const hassedPassword = await bcrypt.hash(person.password, salt);
        person.password = hassedPassword;

        next();
    } catch (error) {
        return next(error);
    }
})


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}


// Create Model of Person

const Person = mongoose.model('Person', personSchema);
console.log(Person)

module.exports = Person;