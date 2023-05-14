const Recipe = require('../models/recipe')

const getAllRecipe = (req, res, next) => {
  Recipe.fetchAllRecipes((recipeData, err) => {
    if (err) {
      //this is an error
      res.render('error', {
        title: 'Something went wrong',
        message: err.message,
      })
    }
    res.render('recipes', { recipes: recipeData, title: 'Recipe List' })
  })
}

const getAddRecipePage = (req, res, next) => {
  res.render('create', { title: 'New Recipe' })
}

const postAddRecipe = (req, res, next) => {
  console.log(req.body)
  let { name, ingredient, instruction, quantity } = req.body

  if (!Array.isArray(ingredient)) {
    ingredient = [ingredient]
    quantity = [quantity]
  }

  if (!Array.isArray(instruction)) {
    instruction = [instruction]
  }

  const ingredients = ingredient.map((ing, i) => {
    //ingredient ---> ['flour', 'sugar', 'butter']
    //quantity ---> ['1 cup', '4 cups', '1 bar']
    return { name: ing, quantity: quantity[i] }
  })

  const newRecipe = new Recipe(name, ingredients, instruction)
  newRecipe.save(({ message, status }) => {
    if (status === 201) {
      return res.redirect('/recipes')
    }

    res
      .status(status)
      .render('error', { title: 'Something went wrong', message })
  })
}

const deleteRecipe = (req, res, next) => {
  Recipe.fetchAllRecipes((recipeData, err) => {
    const id = req.params.id
    const newObj = recipeData.filter((data) => data.id != id)

    Recipe.delete(newObj, ({ message, status }) => {
      if (status === 201) {
        return res.redirect('/recipes')
      }

      res
        .status(status)
        .render('error', { title: 'Something went wrong', message })
    })
  })
}

const deleteAllRecipe = (req, res) => {
  Recipe.deleteAllRecipe(({ message, status }) => {
    if (status === 201) {
      return res.redirect('/recipes')
    }

    res
      .status(status)
      .render('error', { title: 'Something went wrong', message })
  })
}

const getEditRecipe = (req, res) => {
  const id = req.params.id
  Recipe.fetchAllRecipes((recipeData, err) => {
    const editingRecipe = recipeData.filter((data) => data.id == id)

    res.render('edit', { title: 'Edit Recipe', editingRecipe })
  })
}

const postEditRecipe = (req, res) => {
  const id = req.params.id
  Recipe.fetchAllRecipes((recipeData, err) => {
    const remainRecipes = recipeData.filter((data) => data.id != id)

    let { name, ingredient, instruction, quantity } = req.body

    if (!Array.isArray(ingredient)) {
      ingredient = [ingredient]
      quantity = [quantity]
    }

    if (!Array.isArray(instruction)) {
      instruction = [instruction]
    }

    const ingredients = ingredient.map((ing, i) => {
      return { name: ing, quantity: quantity[i] }
    })
    let updatedRecipe = { id, name, ingredient: ingredients, instruction }

    Recipe.update(remainRecipes, updatedRecipe, ({ message, status }) => {
      if (status === 201) {
        return res.redirect('/recipes')
      }
      res
        .status(status)
        .render('error', { title: 'Something went wrong', message })
    })
  })
}

module.exports = {
  getAllRecipe,
  getAddRecipePage,
  postAddRecipe,
  deleteRecipe,
  deleteAllRecipe,
  getEditRecipe,
  postEditRecipe,
}
