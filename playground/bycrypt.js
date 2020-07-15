const bcrypt = require('bcryptjs')

const myFunction = async ()=>{

    const pass = 'Bms@123'
    const hashPass = await bcrypt.hash(pass, 8);
    console.log(pass)
    console.log(hashPass)

    const isMatch = await bcrypt.compare(pass, hashPass)
    console.log(isMatch)
}

myFunction()