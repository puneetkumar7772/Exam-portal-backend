const mongoose =require('mongoose')

const addCategorySchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
 
  });
  
  const Category = mongoose.model("category", addCategorySchema);
  
  module.exports = Category;