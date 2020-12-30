const express = require("express");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, validateEmailAndPassword, validationResult } = require("../../utils");
const { getUserToken, requireAuth } = require("../../auth");
const router = express.Router();
const { User } = require("../../db/models");


router.put(
    "/",
    validateEmailAndPassword,
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
      }
      const token = getUserToken(user);
      res.cookie("token", token);
      res.json({ token, user: { id: user.id }, userObj: {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "avatarUrl": user.avatarUrl,
        "trashBinId": user.trashBinId,
        "personalFolderId": user.personalFolderId
      }});
    })
);

  module.exports = router;
