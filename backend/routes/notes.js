const express = require("express");
const router = express.Router();
const Note = require("../models/note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes: GET "api/auth/getuser". login  required
router.get("/fecthallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal server error occured");
  }
});
//Route 2:Add a new Note using: POST "api/auth/addnote". login  required
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

module.exports = router;
