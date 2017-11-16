const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../../config')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  nikename: { type: String },
  type: { type: String }
});

userSchema.pre('save', function(next) {
  const user = this
  bcrypt.hash(user.password, config.saltRounds, (err, hash) => {
    if(err) return next(err);
    
    user.password = hash;
    next();
  });
});

userSchema.methods.validPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if(err) return callback(err);

      callback(null, isMatch);
  });
}

const User = mongoose.model('Users', userSchema)

module.exports = User