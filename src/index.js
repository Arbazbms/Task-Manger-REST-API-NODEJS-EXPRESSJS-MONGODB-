const express = require("express");
require("./db/mongoose");
const User = require("./models/users");
const Task = require("./models/tasks");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
const app = express();
const port = process.env.PORT || 3000;

//!This middle ware is added to not accept GET methods and accepts other methods
// app.use((req,res, next)=>{
//  if(req.method === 'GET'){
//    res.send('GET METHODS ARE DISABLED')
//  }else{
//   next();
//  }
// })

//!this express-middle ware can be added if the site is under maintenance
// app.use((req,res,next)=>{
//   res.status(503).send('Site Under Construction')
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
  console.log(`Server is up on Port ${port}`);
});
