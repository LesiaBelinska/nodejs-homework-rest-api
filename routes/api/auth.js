const express = require("express");

const ctrl = require("../../controllers/auth");

const { validation } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrl.signup);



module.exports = router;