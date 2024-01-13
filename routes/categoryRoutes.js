const express = require("express");
const categoryController = require("../controllers/addCategory");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");

router.post("/addCategory",authMiddleware, categoryController.addCategory);
router.get("/getCategories",authMiddleware, categoryController.getCategory);
router.get("/getCategories/:id",authMiddleware, categoryController.deleteCategories);
router.get("/getCategory/:id", categoryController.getCategoryById);
router.put("/updatecategory/:id", categoryController.updateCategory);

module.exports = router;
