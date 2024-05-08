const mongoose = require('mongoose');

const url = 'mongodb+srv://risabht043:Skt230144@cluster0.q2uksrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;

db.on('connected', () => {
    console.log("connection established successfully"); 
})

db.on('disconnected', () => {
    console.log("connection breaks"); 
})

db.on('error', () => {
    console.log("connection have error"); 
})



module.exports = db;