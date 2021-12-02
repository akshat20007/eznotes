import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "61a74dfdef48cbb37be5e5c4",
      "user": "619f7542582f013a19a0c4f1",
      "title": " new Note",
      "description": "Please wake up early",
      "tag": "Youtube",
      "timestamp": "2021-12-01T10:27:09.003Z",
      "__v": 0
    },
    {
      "_id": "61a74e02ef48cbb37be5e5c6",
      "user": "619f7542582f013a19a0c4f1",
      "title": " new Note",
      "description": "Please wake up early 2",
      "tag": "Youtube",
      "timestamp": "2021-12-01T10:27:14.418Z",
      "__v": 0
    },
    {
      "_id": "61a74e02ef48cbb37be5e5c6",
      "user": "619f7542582f013a19a0c4f1",
      "title": " new Note",
      "description": "Please wake up early 2",
      "tag": "Youtube",
      "timestamp": "2021-12-01T10:27:14.418Z",
      "__v": 0
    },
    {
      "_id": "61a74e02ef48cbb37be5e5c6",
      "user": "619f7542582f013a19a0c4f1",
      "title": " new Note",
      "description": "Please wake up early 2",
      "tag": "Youtube",
      "timestamp": "2021-12-01T10:27:14.418Z",
      "__v": 0
    },{
      "_id": "61a74e02ef48cbb37be5e5c6",
      "user": "619f7542582f013a19a0c4f1",
      "title": " new Note",
      "description": "Please wake up early 2",
      "tag": "Youtube",
      "timestamp": "2021-12-01T10:27:14.418Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes, setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
