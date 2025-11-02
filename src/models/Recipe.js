
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  prepTime: { type: Number },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);
