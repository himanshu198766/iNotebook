import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <>
      <AddNote />
      <div className="container mt-3">
        <h1>Your Notes</h1>
        <Notes />
      </div>
    </>
  );
};

export default Home;
