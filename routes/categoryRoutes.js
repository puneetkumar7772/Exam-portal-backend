const express = require("express");
const categoryController = require("../controllers/addCategory");
const router = express.Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/getCategories", categoryController.getCategory);
router.get("/getCategories/:id", categoryController.deleteCategories);
router.get("/getCategory/:id", categoryController.getCategoryById);
router.put("/updatecategory/:id", categoryController.updateCategory);

module.exports = router;
