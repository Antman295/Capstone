import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    meal_type: { type: String, required: true },
    dish: { type: String, required: true, unique: true },
    difficulty: {type: String, required: true},
    time: { type: Number },
    ingredients: [{
        name: {type: String, required: true},
    }]
})

recipeSchema.index({dish: 1})

export default mongoose.model('Recipe', recipeSchema)