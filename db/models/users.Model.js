const mongoose = require("mongoose");
// const ShortUniqueId = require('short-unique-id');
const bcrypt = require("bcrypt");

// const uid = new ShortUniqueId({ length: 10 });
// const ObjectId = Schema.Types.ObjectId;

const Schema = mongoose.Schema;

// Define User Schema
const userSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// before save
//Hash password before saving to database
userSchema.pre('save', async function(next){
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
})

userSchema.methods.isValidPassword = async function(password){
  const user = this
  const compare = await bcrypt.compare(password, this.password);

  return compare;
}

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;