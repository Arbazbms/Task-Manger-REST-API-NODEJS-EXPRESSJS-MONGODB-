const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require('./tasks')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password" ');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive Number!");
      }
    }
  },
  tokens: [{
      token :{
        type: String,
        required : true
      }
    }]
}, {
  timestamps: true
});

//delete user tasks when user is deleted 
userSchema.pre('remove', async function(next){
  const user = this;

  await Task.deleteMany({owner: user._id})

  next();
})

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject()

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

//generate Auth in from login route in users/login
userSchema.methods.generateAuthToken = async function () {
  console.log("inside generateAuthToken");
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "hellonodejs");

  // saving token to DB
  user.tokens = user.tokens.concat({token})
  await user.save()

  console.log(token);

  return token;
};

//from user route users/login post in router/users.js file
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("passwd is incorrect!!!!!");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  //   console.log("just before Saving");

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
