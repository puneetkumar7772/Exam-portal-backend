const mongoose = require("mongoose");

const addCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  adminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

const Category = mongoose.model("category", addCategorySchema);

module.exports = Category;
