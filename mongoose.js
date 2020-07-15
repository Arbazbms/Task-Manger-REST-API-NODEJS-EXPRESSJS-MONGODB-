const mongoose = require('mongoose')
const path = require("path");
const express = require("express");
var router = express.Router();
const app = express();
 
publicDirectoryPath = path.join(__dirname, "public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
     useUnifiedTopology: true, 
     useCreateIndex: true 
})

const User = mongoose.model('User', {
     name: {
          type: String,
           required: true
     },
     age:{
          type: Number
     }
})

const Tasks = mongoose.model('Tasks', {

     Description:{
          type:String,
         
     },
     completed:{
          type: Boolean
     }
})


 app.get('/',(req,res)=>{
           User.find((err,docs)=>{
                if(!err)
                {
                    console.log(docs);
                    
                    res.render('index',{
                        list:docs,
                        title: 'Fetch and display data from DataBase in  Html'
                    })
                    
                }else{
                    console.log(err);
                    
                }
            })
    })




// const t = new Tasks({
//      Description: 'prepare for test',
//      completed: false
// })

// t.save().then(()=>{
//      console.log(t)
// }).catch(()=>{
//      console.log('Error!', error)   
// })


//create an instance of model
    
// const me = new User({
// //name:'shehzan',
//      age: 2
// })

// //save to database

// me.save().then(()=>{
//      console.log(me);
     
// }).catch((error)=>{
//      console.log(error);
     
// })


app.listen(3000, () => {
  console.log("Server is Up on Port 3000");
});
