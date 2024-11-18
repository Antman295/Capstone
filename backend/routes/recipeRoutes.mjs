import express from 'express';
import recipeCTRL from '../controllers/recipeControllers.mjs';

const router = express.Router();

// Create/ReadAll
router
  .route('/')
  .post(recipeCTRL.createRecipe)
  .get(recipeCTRL.getAllRecipe);

// Update/Delete
router
  .route('/:id')
  .put(recipeCTRL.updateOneRecipe)
  .delete(recipeCTRL.deleteOneRecipe)
  .get(recipeCTRL.getOneRecipe);

// router.route('/seed').get(recipeCTRL.seedDB);

export default router;