const express = require("express");

const ctrl = require("../../controllers/auth");

const { validation, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrl.signup);

router.post("/login", validation(schemas.signup), ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;