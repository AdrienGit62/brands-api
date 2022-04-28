var express = require("express");
var router = express.Router();

//Controller
var brands_controller = require("../controllers/brands");

router.get("/", brands_controller.getAll);

router.get("/:id", brands_controller.getById);

router.post("/", brands_controller.create);

router.put("/:id", brands_controller.update);

router.delete("/:id", brands_controller.delete);

module.exports = router;