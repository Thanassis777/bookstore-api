const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   code: {
      unique: true,
      type: String,
      required: true,
   },
   label: {
      type: String,
      required: true,
      enum: ['Action', 'Science', 'Fantasy', 'Mystery', 'Thriller'],
   },
});

module.exports = mongoose.model('Category', categorySchema);
