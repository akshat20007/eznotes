import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all Note
  const getNotes = async() => {
    //API call
    const response = await fetch(`${host}/api/notes/fecthallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Zjc1NDI1ODJmMDEzYTE5YTBjNGYxIn0sImlhdCI6MTYzNzg0MDIyMn0.dQKf1_L6lnaI2_RW5jltVJuJcSarWb1fLNyaTLviKsU",
      },
    });
    const json = await response.json();
   console.log(json)
   setNotes(json)
  };

  //Add a Note
  const addNote = async(title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Zjc1NDI1ODJmMDEzYTE5YTBjNGYxIn0sImlhdCI6MTYzNzg0MDIyMn0.dQKf1_L6lnaI2_RW5jltVJuJcSarWb1fLNyaTLviKsU",
      },
      body: JSON.stringify({title, description,tag}),
    });

    console.log("Adding a new Note");
    const note = {
      _id: "61a74e02ef48cbb37be5e5c66",
      user: "619f7542582f013a19a0c4f1",
      title: title,
      description: description,
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
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(
      `${host}/api/notes/updatenote/61a104a688dbdde0e08d7c15`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Zjc1NDI1ODJmMDEzYTE5YTBjNGYxIn0sImlhdCI6MTYzNzg0MDIyMn0.dQKf1_L6lnaI2_RW5jltVJuJcSarWb1fLNyaTLviKsU",
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
