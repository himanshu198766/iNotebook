import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [count, setCount] = useState(0)

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

    const json = response.json()

    // const note = {
    //   _id: count,
    //   user: '6131dc5e3e4037cd4734a066',
    //   title: title,
    //   description: description,
    //   tag: 'personal',
    //   date: '2021-09-03T14:20:09.509Z',
    //   __v: 0,
    // }
    // setCount(count + 1)

    // setNotes(notes.concat(note))
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

    const json = await response.json()
    let newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
    console.log(json)
  }

  // edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxZGExNmZmNGY4OGVjZmY3ZmI0MjFkIn0sImlhdCI6MTY2MjkxNTQ3OH0.gs8QpHkSf1NE-5emmU9xRH1KLJUMduXS8GPcWGoN21M',
      },
      body: JSON.stringify({ title, description, tag }),
    })

    const json = response.json()

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index]
      if (element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }

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
