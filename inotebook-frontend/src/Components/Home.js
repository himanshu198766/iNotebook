import React from 'react'
import Notes from './Notes'

const Home = (props) => {
  return (
    <>
      <div className="container mt-5">
        <h1>Your Notes</h1>
        <Notes showAlert={props.showAlert} />
      </div>
    </>
  )
}

export default Home
