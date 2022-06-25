const mongoose = require('mongoose');

const boookSchema = new mongoose.Schema({
   isbn: {
      unique: true,
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
   authors: [
      {
         type: String,
         required: true,
      },
   ],
   category: [
      {
         type: String,
         required: true,
      },
   ],
   publisher: {
      type: String,
      required: true,
   },
   published: {
      type: Date,
      required: true,
      default: Date.now,
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
   avatar: {
      type: Buffer,
   },
});

module.exports = mongoose.model('Book', boookSchema);
