const express = require("express");
const registerController = require("../controllers/registerController");
const router = express.Router();

router.post("/registerUser", registerController.registerUser);
router.post("/loginUser", registerController.loginUser);
router.get("/getUsers", registerController.getUser);
router.delete("/deleteUser/:id", registerController.deleteUserById);




module.exports = router;
