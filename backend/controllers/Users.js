const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash, //It is a typo? the doc only writes passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('notes')

    response.json(users)
})

module.exports = usersRouter