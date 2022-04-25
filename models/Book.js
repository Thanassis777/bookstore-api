const mongoose = require('mongoose');

const boookSchema = new mongoose.Schema({
   isbn: {
      type: Number,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   subtitle: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   publisher: {
      type: String,
      required: true,
   },
   published: {
      type: Date,
      required: true,
   },
   pages: {
      type: Number,
      required: true,
   },
   rating: {
      type: Number,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model('Book', boookSchema);
