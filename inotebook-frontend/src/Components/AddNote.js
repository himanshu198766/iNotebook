import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/NoteContext'

const AddNote = () => {
  const context = useContext(noteContext)
  const { addNote } = context
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  })
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({
      title: '',
      description: '',
      tag: '',
    })
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container mt-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              name="description"
              className="form-label"
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              onChange={onChange}
              value={note.description}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              name="tag"
              className="form-label"
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name="tag"
              id="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  )
}

export default AddNote
