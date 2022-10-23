const mongoose = require('mongoose')

const User = new mongoose.Schema({
 
    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type:String,
        required: true
    },
      

    dateRegistered:{
        type:Date,
        default:Date.now()
        
    }
 
})

module.exports = mongoose.model('testUsers123', User)