const notesRouter = require('express').Router()
const Note = require('../models/Note')


notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes.map(note => note.toJSON()))
})

notesRouter.get('/:id', async (request, response) => {

    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body,'body ***')


    const user = await User.findById(body.userId)
    console.log(user,'USER ***')

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        date: new Date(),
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote.toJSON())
})


notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

notesRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)


})

module.exports = notesRouter

