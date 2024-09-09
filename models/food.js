const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: String,
    calories: Number,
    isVegetarian: Boolean
})

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;


