import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    meal_type: { type: String, required: true },
    dish: { type: String, required: true, unique: true },
    difficulty: {type: String, required: true},
    time: { type: Number },
    ingredients: [{
        1: {type: String},
        2: {type: String},
        3: {type: String},
        4: {type: String}
    }]
})

recipeSchema.index({name: 1})

export default mongoose.model('Recipe', recipeSchema)