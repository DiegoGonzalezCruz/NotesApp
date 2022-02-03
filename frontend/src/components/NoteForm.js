import React, { useState } from 'react'
import propTypes from 'prop-types'

export default function NoteForm({ createNote }) {

  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    })
    setNewNote('')
  }
  return (
    <div className='formDiv'>
      <h2>Create a new Note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

NoteForm.propTypes = {
  createNote: propTypes.func.isRequired
}
