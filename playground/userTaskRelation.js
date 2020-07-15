const Task = require('../src/models/tasks')
const User = require('../src/models/users')

const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5c2e4dcb5eac678a23725b5b')
    await user.populate('tasks').execPopulate()
    console.log('Inside populate')
    console.log(user.tasks)
}

main()