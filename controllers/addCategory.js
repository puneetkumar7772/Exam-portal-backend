const Category = require("../models/categoryModel");

exports.addCategory = async (req, res) =>{
  try {
    const {
    category,
    description,

    } = req.body;
    const newCategory = new Category({
    category,
    description,
    });
    await newCategory.save();

    res.status(201).json({ message: "Category Add successfully" });
  } catch (error) {
    res.status(400).json({ error: `Category Add is failed ${error}`});
  }
};

exports.getCategory = async (req, res) => {
    try {
      const Categories = await Category.find()
      res.status(200).json(Categories);
    } catch (error) {
      res.status(500).json({ error: "Category is not present" });
    }
};

exports.deleteCategories = async (req, res) => {
    try {
      const categoryId =  req.params.id;
      const deletedCategories = await Category.findOneAndDelete({ _id: categoryId });
      if (!deletedCategories) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json("Category is deleted successfully");
    } catch (error) {
      res.status(500).json({ error: "Internal server" });
    }
  };
  