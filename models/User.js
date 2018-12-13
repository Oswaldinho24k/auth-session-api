const mongoose = require('mongoose')
const Schema = mongoose.Schema
const plm = require('passport-local-mongoose')


const userSchema = new Schema({
  username:{
    type:String,
    unique:true,
  },
  email:{
    unique:true,
    type:String
  },
  photoURL:String,
  phone:{
    type:Number,
    unique:true
  },
  role:{
    type:String,
    enum:['Admin', 'Employee']
  }
},{
  timestamps:true
})

userSchema.plugin(plm,{usernameField:'email'})
module.exports = mongoose.model('User', userSchema)