const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,  
  },
  create_at:{
    type:Date,
    default:Date.now()
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
