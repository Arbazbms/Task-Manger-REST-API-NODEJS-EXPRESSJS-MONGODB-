require('../src/db/mongoose')
const Task = require('../src/models/tasks')

Task.findByIdAndDelete('5e21b832aa4441246c613015').then((task)=>{
    console.log(task);
    return Task.countDocuments({  completed: false})   
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e);
})



