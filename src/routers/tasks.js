const express = require("express");
const router = new express.Router();
const Task = require("../models/tasks");
const auth = require('../middleware/auth')

//Get Task by its ID
router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id})

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Save Task to DB
router.post("/tasks", auth, async (req, res) => {
  console.log(req.body);
 // const task = new Task(req.body);
 const task = new Task({
   ...req.body,
   owner: req.user._id
 })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.send(error);
  }
});

//Get All Tasks
router.get("/tasks", auth, async (req, res) => {
  try {
   // const tasks = await Task.find({});
   //const tasks = await Task.find({owner: req.user. _id});
   await req.user.populate('tasks').execPopulate()
   res.send(req.user.tasks)
    
  } catch (e) {
    res.status(500).send();
  } 
});     

router.patch("/tasks/:id", auth, async (req, res) => {
  console.log("helloooooooooooooooooooooooooooooooo");

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operations" });
  }

  try { 
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    const task = await Task.findOne({ _id: req.params.id , owner: req.user._id})

    //const task = await Task.findById(req.params.id);
  
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.send(task);

  } catch (error) {
    res.send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  console.log("sssssssssssssssssssssssssssssssssssssssssssss");
  try {
    //const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
