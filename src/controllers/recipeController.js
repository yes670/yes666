
const Recipe = require('../models/Recipe');
const asyncHandler = require('express-async-handler');

const createRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, instructions, prepTime } = req.body;
  const recipe = new Recipe({
    title,
    ingredients,
    instructions,
    prepTime,
    author: req.user._id
  });
  const createdRecipe = await recipe.save();
  res.status(201).json(createdRecipe);
});

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ author: req.user._id });
  res.json(recipes);
});

const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }
  if (recipe.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Unauthorized');
  }
  recipe.title = req.body.title || recipe.title;
  recipe.ingredients = req.body.ingredients || recipe.ingredients;
  recipe.instructions = req.body.instructions || recipe.instructions;
  recipe.prepTime = req.body.prepTime || recipe.prepTime;

  const updatedRecipe = await recipe.save();
  res.json(updatedRecipe);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    res.status(404);
    throw new Error('Recipe not found');
  }
  if (recipe.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Unauthorized');
  }
  await recipe.remove();
  res.json({ message: 'Recipe removed' });
});

module.exports = { createRecipe, getRecipes, updateRecipe, deleteRecipe };
