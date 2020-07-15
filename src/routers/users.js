const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const auth = require('../middleware/auth')


//save Users to DB Sign-up
router.post("/users", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

//user sign-in
router.post('/users/login', async (req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token})
  }catch (e){
    res.status(400).send();
  }
})



//Get all the Users
router.get("/users/me", auth, async (req, res) => {
 res.send(req.user)
});

//logout user
router.post('/users/logout', auth, async (req,res)=>{
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token;
    })
    await req.user.save();

    res.send();;
  }catch(e) {
    res.status(500).send()
  }
})

//logout all Users
router.post('/users/logoutAll',auth , async (req,res)=>{
  try{
    
    req.user.tokens = [];
    await req.user.save()
    res.send();

  }catch(e){
      res.status(500).send()
  }
})


// Get a user by its ID THIS IS NOT REQUIRED
router.get("/users/:id", async (req, res) => {
  console.log(req.params);
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});


//Update User bY ID
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
 

  try {
   
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    console.log("errrrrrrrrrrrrrrrrrrrrr");

    res.status(400).send(error);
  }
});



router.delete("/users/me", auth, async (req, res) => {
 
  try {
    await req.user.remove()
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
