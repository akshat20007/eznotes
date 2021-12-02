import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import { Noteitem } from "./Noteitem";
export const Notes = () => {
  const context = useContext(noteContext);
  //Destructuring
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <h1> Your Note</h1>
      {notes.map((note) => {
        return <Noteitem note={note} />;
      })}
    </div>
  );
};
