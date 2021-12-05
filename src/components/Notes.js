import React, { useContext, useEffect,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { AddNote } from "./AddNote";
import { Noteitem } from "./Noteitem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
    e.preventDefault();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  // const ref = useRef(null);
  const updateNote = (currentNote) => {
    handleShow();
    setNote({id:currentNote._id,etitle:currentNote.title, edescription: currentNote.description,etag:currentNote.tag})
    // ref.current.click();
  };
  return (
    <>
      <AddNote />
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="etitle"  className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                value={note.etitle}
                aria-describedby="emailHelp"
                onChange={onChange}
              /> 
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                name="edescription"
                value={note.edescription}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose,handleClick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row my-3">
        <h1> Your Note</h1>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};
