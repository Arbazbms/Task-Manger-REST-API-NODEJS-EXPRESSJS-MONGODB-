const jwt = require('jsonwebtoken')

const myFunction = async ()=>{
    
    const token = jwt.sign( {id: 'abc1345'}, 'hellonodejs', {expiresIn: '5 seconds'})
    console.log(token)

    const data = jwt.verify(token, 'hellonodejs')
    console.log(data);
}

myFunction()