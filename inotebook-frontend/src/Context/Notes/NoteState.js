import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const host = 'http://localhost:5000/'
  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZGExNmZmNGY4OGVjZmY3ZmI0MjFkIn0sImlhdCI6MTY2MjkxNTQ3OH0.gs8QpHkSf1NE-5emmU9xRH1KLJUMduXS8GPcWGoN21M',
      },
      body: JSON.stringify({ title, description, tag }),
    })

    const note = await response.json()

    setNotes(notes.concat(note))
  }

  const getAllNotes = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZGExNmZmNGY4OGVjZmY3ZmI0MjFkIn0sImlhdCI6MTY2MjkxNTQ3OH0.gs8QpHkSf1NE-5emmU9xRH1KLJUMduXS8GPcWGoN21M',
      },
    })

    const json = await response.json()

    setNotes(json)
  }

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZGExNmZmNGY4OGVjZmY3ZmI0MjFkIn0sImlhdCI6MTY2MjkxNTQ3OH0.gs8QpHkSf1NE-5emmU9xRH1KLJUMduXS8GPcWGoN21M',
      },
    })

    let newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZGExNmZmNGY4OGVjZmY3ZmI0MjFkIn0sImlhdCI6MTY2MjkxNTQ3OH0.gs8QpHkSf1NE-5emmU9xRH1KLJUMduXS8GPcWGoN21M',
      },
      body: JSON.stringify({ title, description, tag }),
    })

    let newNote = JSON.parse(JSON.stringify(notes))

    // logic to edit note
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break
      }
    }

    setNotes(newNote)
    return response.json()
  }

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
