const mongodb = require("mongodb");
const path = require("path");
const express = require("express");

const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const app = express();

publicDirectoryPath = path.join(__dirname, "public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);

//const { MongoClient, ObjectID } = require('mongodb')//instead of first 3 lines

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to databse!");
    }
    // console.log('Connected successfully');
    const db = client.db(databaseName);

    // db.collection('users').findOne({
    //     name: 'madiha'
    // }, (error,user)=>{
    //     if(error){
    //         return console.log(error)
    //     }

    //     console.log(user);

    // })

    // app.get("/", (req, res) => {
    //   db.collection("users").findOne(
    //     {
    //       name: "madiha"
    //     },
    //     (error, user) => {
    //       if (!error) {
    //         console.log(user.name);

    //         res.render("index", {
    //          list: user.name,
    //           name: user.name
    //         });
    //       } else {
    //         console.log("errooooorr!");
    //       }
    //     }
    //   );
    // });

    app.get('/',(req,res)=>{
            db.collection('users').find((err,docs)=>{
                if(!err)
                {
                    console.log(docs);
                    
                    res.render('index',{
                        list:docs,
                       
                    })
                }else{
                    console.log(err);
                    
                }
            })
    })

    // db.collection('users').find({
    //     age:20
    // }).toArray((error,users) => {
    //     console.log(users);

    // })

    // db.collection('users').find({
    //     age:20
    // }).count((error,count) => {
    //     console.log(count);

    // })
  }
); //mongoClient close callback functtion closed //mongoClient close callback functtion closed

// app.get("/", (req, res) => {

//   res.render("index");
// });

app.listen(3000, () => {
  console.log("Server is Up on Port 3000");
});
