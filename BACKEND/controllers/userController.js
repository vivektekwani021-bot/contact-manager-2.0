const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const  jwt = require("jsonwebtoken")
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  // Create new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Response
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
// Login user (placeholder)
// @desc    user  user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email ,password } = req.body;
    if(!email || !password){
        res.status(200)
        throw new Error("all fields are mandatory");
 }
     
     
     const user = await User.findOne({ email });

 // compare the password with hashedpassword
 if(user && (await bcrypt.compare(password , user.password)))
 {
    const accesstoken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id,
        },
    } , process.env.ACCESS_TOKEN_SECRET , {expiresIn: "15m"}
            )
    res.status(200).json({accesstoken})
 }else{
    res.status(401)
    throw new Error("email or password is not valid")
 }

  //res.status(200).json({ message: "Login successful" });
});

// Current user (placeholder)
// @desc   current user information
// @route   POST /api/users/current
// @access  Public
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };


