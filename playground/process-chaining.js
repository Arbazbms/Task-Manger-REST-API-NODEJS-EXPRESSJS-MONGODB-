require('../src/db/mongoose');
const User = require('../src/models/users')



//!update
User.findByIdAndUpdate('5e2d70e0364cff1760055d4a', {age: 606, name: 'updatedddd'}).then((user)=>{
    console.log(user);
    //after update i need to count the documents //! i can use  process chaining for this 2 operations
    return User.countDocuments({}) //!countDocuments({ age: 1}) specific count 
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e)
})

//! BETTER WAY TO DO IT THAN ABOVE
const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id, {age:age})
    const count = await User.countDocuments({ age })
    return count;
}

updateAgeAndCount('5e2d6b057f063a2234858eb1', 101).then((count)=>{
    console.log(count)  
}).catch((e)=>{
    console.log(e);
})



