const express = require('express');
const Note = require('../models/notes');

const router = express.Router();

router.post('/notes', async (req, res) => {
  const { message } = req.body;
  const newNote = new Note({ message });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);  // First response
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });  // Second response
  }
});

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ notes, message: "Notes retrieved successfully" }); // Send one response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/notes/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
