import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "61a74dfdef48cbb37be5e5c4",
      user: "619f7542582f013a19a0c4f1",
      title: " new Note",
      description: "Please wake up early",
      tag: "Youtube",
      timestamp: "2021-12-01T10:27:09.003Z",
      __v: 0,
    },
    {
      _id: "61a74e02ef48cbb37be5e5c6",
      user: "619f7542582f013a19a0c4f1",
      title: " new Note",
      description: "Please wake up early 2",
      tag: "Youtube",
      timestamp: "2021-12-01T10:27:14.418Z",
      __v: 0,
    },
    {
      _id: "61a74e02ef48cbb37be5e5c65",
      user: "619f7542582f013a19a0c4f1",
      title: " new Note",
      description: "Please wake up early 2",
      tag: "Youtube",
      timestamp: "2021-12-01T10:27:14.418Z",
      __v: 0,
    },
    {
      _id: "61a74e02ef48cbb37be5e5c63",
      user: "619f7542582f013a19a0c4f1",
      title: " new Note",
      description: "Please wake up early 2",
      tag: "Youtube",
      timestamp: "2021-12-01T10:27:14.418Z",
      __v: 0,
    },
    {
      _id: "61a74e02ef48cbb37be5e5c66",
      user: "619f7542582f013a19a0c4f1",
      title: " new Note",
      description: "Please wake up early 2",
      tag: "Youtube",
      timestamp: "2021-12-01T10:27:14.418Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = (title, description, tag) => {
    //TODO:Api call
    console.log("Adding a new Note")
    const note = {
      _id: "61a74e02ef48cbb37be5e5c66",
      user: "619f7542582f013a19a0c4f1",
      title: title,
      description:description,
      tag: tag,
      timestamp: "2021-12-01T10:27:14.418Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
     //TODO:Api call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id !==id})
    setNotes(newNotes);
  };

  //edit a Note
  const editNote = (id, title, description , tag) => {};
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
