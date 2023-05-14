const router = require('express').Router()
const {
  getAllRecipe,
  getAddRecipePage,
  postAddRecipe,
  deleteRecipe,
  deleteAllRecipe,
  getEditRecipe,
  postEditRecipe,
} = require('../controllers/recipe.controller')

router.get('/', getAllRecipe)
router.get('/delete/:id', deleteRecipe)
router.get('/deleteAll', deleteAllRecipe)

router.get('/save', getAddRecipePage)
router.post('/save', postAddRecipe)

router.get('/edit/:id', getEditRecipe)
router.post('/edit/:id', postEditRecipe)

module.exports = router
