const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/ezNotes?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connect to mongo')
    })
}

module.exports = connectToMongo;