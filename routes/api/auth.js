const express = require("express");

const ctrl = require("../../controllers/auth");

const { validation, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrl.signup);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/login", validation(schemas.signup), ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
