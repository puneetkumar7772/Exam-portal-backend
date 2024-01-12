const express = require("express");
const registerController = require("../controllers/registerController");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/registerUser", registerController.registerUser);
router.post("/loginUser", registerController.loginUser);
router.get("/getUsers", registerController.getUser);
router.delete("/deleteUser/:id",authMiddleware, registerController.deleteUserById);




module.exports = router;
