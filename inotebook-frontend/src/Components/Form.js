import React from 'react'

const Form = (props) => {
  const handleClick = (e) => {
    e.preventDefault()
    props.addNote(props.note.title, props.note.description, props.note.tag)
  }
  const onChange = (e) => {
    props.setNote({ ...props.note, [e.target.name]: e.target.value })
  }

  return (
    <>
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
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </>
  )
}

export default Form
