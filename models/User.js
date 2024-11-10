const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {type:String, required:true}, //if username is not unique, it's okay, we will use email for auth
    email: {
        type:String, 
        index:true, // for fast retrieval
        required:true, 
        unique:true,
    },
    password: {type:String, required:true},
})

// add pre processing whenever data is sent to save.
userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) // if password is not modified, just go to the next middleware
    return next();
  const salt = await bcrypt.genSalt(10); // generate salt if password is modified (as of now, no implementation)
  this.password = await bcrypt.hash(this.password, salt); // set the hash
  next();

});

module.exports = mongoose.model('user',userSchema,'users')
