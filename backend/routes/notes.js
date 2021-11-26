const express = require("express");
const router = express.Router();
const Note = require("../models/note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes: GET "api/notes/getuser". login  required
router.get("/fecthallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal server error occured");
  }
});
//Route 2:Add a new Note using: POST "api/notes/addnote". login  required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      //If there are error return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

//Route 3: Update an existing note: PUT "api/notes/updatenote". login  required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//Route 4: Delete an existing note: DELETE "api/notes/deleteNote". login  required
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "note has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

module.exports = router;
