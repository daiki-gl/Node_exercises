const Recipe = require('../models/recipe.model')

const getAllRecipe = (req, res, next) => {
  Recipe.find()
    .then((rows) => {
      res.render('recipes', { recipes: rows, title: 'Recipe list' })
    })
    .catch((err) => console.error(err.message))
}

const getAddRecipePage = (req, res, next) => {
  res.render('create', { title: 'Create Recipe' })
}

const postAddRecipe = (req, res, next) => {
  let { name, ingredient, instruction, quantity } = req.body

  ingredient = arrayCheck(ingredient)
  quantity = arrayCheck(quantity)
  instruction = arrayCheck(instruction)

  const ingredients = ingredient.map((ing, i) => {
    return { name: ing, quantity: quantity[i] }
  })

  const newRecipe = new Recipe(name, ingredients, instruction)
  newRecipe
    .save()
    .then(() => {
      res.redirect('/recipes')
    })
    .catch((err) => console.err(err.message))
}

const getEditRecipeById = (req, res) => {
  const id = req.params.id
  Recipe.findById(id)
    .then((rows) => {
      res.render('edit', { recipe: rows[0], title: 'Edit recipe' })
    })
    .catch((err) => console.error(err))
}

const postEditRecipeById = (req, res) => {
  const id = req.params.id
  const { name, ingredient, instruction, quantity } = req.body

  ingredient = arrayCheck(ingredient)
  quantity = arrayCheck(quantity)
  instruction = arrayCheck(instruction)

  const ingredients = ingredient.map((ing, i) => {
    return { name: ing, quantity: quantity[i] }
  })

  const dataToUpdate = { id, name, ingredients, instruction }

  Recipe.updateOne(dataToUpdate)
    .then(() => {
      res.redirect('/recipes')
    })
    .catch((err) => console.error(err))
}

const deleteRecipe = (req, res) => {
  const id = req.params.id

  Recipe.deleteOne(id)
    .then(() => {
      res.redirect('/recipes')
    })
    .catch((err) => console.error(err))
}

module.exports = {
  getAllRecipe,
  getAddRecipePage,
  postAddRecipe,
  getEditRecipeById,
  postEditRecipeById,
  deleteRecipe,
}

function arrayCheck(item) {
  if (!Array.isArray(item)) {
    item = [item]
  }
  return item
}
