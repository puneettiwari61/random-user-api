var express = require("express");
var router = express.Router();

var usersController = require("../controllers/usersController");

/* GET users list. */
router.get("/", usersController.getUsersList);

/* GET users profile. */
router.get("/:id", usersController.getUserProfile);

/* save users profile. */
router.post("/", usersController.saveUser);

/* update users profile. */
router.put("/:id", usersController.updateUser);

/* delete users profile. */
router.delete("/:id", usersController.deleteUser);

module.exports = router;
