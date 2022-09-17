import React, { useContext } from 'react'
import noteContext from '../Context/Notes/NoteContext'

const NoteItem = (props) => {
  const { note } = props
  const context = useContext(noteContext)
  const { deleteNote, editNote } = context
  const handleDelete = () => {
    deleteNote(props.note._id)
  }
  const handleEdit = () => {
    editNote(
      props.note._id,
      props.note.title,
      props.note.description,
      props.note.tag,
    )
  }
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} </p>
            <p className="card-text">{note.tag} </p>
            <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={handleEdit}
            ></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem
