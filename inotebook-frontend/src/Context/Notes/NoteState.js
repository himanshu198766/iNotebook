import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "61322f1955381a8ca8d0e06",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.509Z",
      __v: 0,
    },
    {
      _id: "61322f195581a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f19553781a8ca8d08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f19553781a8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f19553781a8ca0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f19553781a8ca8d0e",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f19553781a8sfaca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = (title, description, tag) => {
    const note = {
      _id: "61322f1955381a8ca8d0e06",
      user: "6131dc5e3e4037cd4734a066",
      title: title,
      description: description,
      tag: "personal",
      date: "2021-09-03T14:20:09.509Z",
      __v: 0,
    };

    console.log("adding new note");

    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = () => {};

  // edit a note
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
