const Category = require("../models/categoryModel");

exports.addCategory = async (req, res) => {
  console.log(req.user)
  if(req.user.role!=='admin')
  return res.status(403).json({error:"you are not admin"})
  try {
    const { category, description} = req.body;
    const data = await Category.findOne({ category });
    if (data) {
      return res
        .status(400)
        .json({ error: "Duplicate category is not allowed" });
    }
    const newCategory = new Category({
      category,
      description,
      adminId:req.user._id
    });
    await newCategory.save();

    return res.status(201).json({ message: "Category Add successfully" });
  } catch (error) {
    return res.status(400).json({ error: `Category Add is failed ${error}` });
  }
};

exports.getCategory = async (req, res) => {
  console.log(req.user.role)
  try {
    const Categories = await Category.find(req.user.role==="admin" ? {adminId:req.user._id}:{});
    console.log(Categories,"9999")
    res.status(200).json(Categories);
  } catch (error) {
    res.status(500).json({ error: "Category is not present" });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategories = await Category.findOneAndDelete({
      _id: categoryId,
    });
    if (!deletedCategories) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json("Category is deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log("Quiz ID:", categoryId);
    const getCategoryById = await Category.findById(categoryId);
    if (!getCategoryById) {
      return res.status(404).json({ error: "category not found" });
    }
    res.status(200).json({ success: true, data: getCategoryById });
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCategory = req.body;

    const result = await Category.findByIdAndUpdate(id, updateCategory, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
