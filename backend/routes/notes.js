const express = require('express')

const fetchUser = require('../middleware/fetchUser')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const Notes = require('../models/Notes')

// get all notes from using GET "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.log(error)
    res.status(500).send('Some error occurred')
  }
})

// add new notes using POST "/api/notes/fetchallnotes" login required
router.post(
  '/addnote',
  fetchUser,
  [
    body('title', 'Enter a valid title with minimum 3 character').isLength({
      min: 3,
    }),
    body(
      'description',
      'Enter a valid description with minimum 5 character',
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors return errors, Bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { title, description, tag } = req.body

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      })

      const savedNote = await note.save()

      res.send(savedNote)
    } catch (error) {
      console.log(error)
      res.status(500).send('Some error occurred')
    }
  },
)

// update notes using PUT "/api/notes/updatenote/:id" login required

router.put(
  '/updatenote/:id',
  fetchUser,
  [
    body('title', 'Enter a valid title with minimum 3 character').isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    // If there are errors return errors, Bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { title, description, tag } = req.body
      const newNote = {}

      if (title) {
        newNote.title = title
      }

      if (description) {
        newNote.description = description
      }

      if (tag) {
        newNote.tag = tag
      }

      // Find note to be update and update

      let note = await Notes.findById(req.params.id)

      console.log(note)
      if (!note) {
        return res.status(404).send('Not found')
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Not allowed')
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true },
      )
      res.send({ note })
    } catch (error) {
      console.log(error)
      res.status(500).send('Some error occurred')
    }
  },
)

// delete existing notes using delete "/api/notes/delet/:id" login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    // Find note to be updated and deleted
    let note = await Notes.findById(req.params.id)

    if (!note) {
      return res.status(404).send('Not found')
    }

    // Allow deletion only if user owns this notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed')
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ Success: 'Note has been deleted successfully', note: note })
  } catch (error) {
    console.log(error)
    res.status(500).send('Some error occurred')
  }
})

module.exports = router
