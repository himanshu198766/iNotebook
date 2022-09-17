import React, { useContext } from "react";
import noteContext from "../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <div className="row my-3">
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
    </div>
  );
};

export default Notes;
