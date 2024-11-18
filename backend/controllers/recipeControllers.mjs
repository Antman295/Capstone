import Recipe from '../models/recipeSchema.mjs';
import recipe from '../data/data.mjs';

async function createRecipe(req, res) {
  try {
    // Create a new produce obj
    let newRecipe = new Recipe(req.body);

    // Save new obj to DB
    await newRecipe.save();

    // Return Result
    res.json(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function getAllRecipe(req, res) {
  try {
    // Find ALL {} produce from DB
    let allRecipe = await Recipe.find({});

    // Return Result
    res.json(allRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function getOneRecipe(req, res) {
  try {
    let oneRecipe = await Recipe.findById(req.params.id);

    res.json(oneRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function updateOneRecipe(req, res) {
  try {
    let updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Return results
    res.json(updatedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function deleteOneRecipe(req, res) {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Item Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function seedDB(req, res) {
  try {
    await Recipe.deleteMany({}); //Delete everything
    await Recipe.create(produce); //Reseed with new data

    res.json({ msg: 'DB Seeded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

export default {
  createRecipe,
  getAllRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  getOneRecipe,
  seedDB,
};