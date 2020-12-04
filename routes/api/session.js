const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../../utils");
const { getUserToken, requireAuth } = require("../../auth");
const router = express.Router();
const { User } = require("../../db/models");


const validateEmailAndPassword = [
    check("email")
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Please provide a valid email."),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a password."),
    handleValidationErrors,
  ];

  router.post(
    "/",
    validateEmailAndPassword,
    asyncHandler(async (req, res) => {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstName, lastName, email, hashedPassword });

      const token = getUserToken(user);
      res.cookie("token", token);
      res.status(201).json({
        user: { id: user.id },
        token,
      });
    })
  );

  router.put(
    "/",
    validateEmailAndPassword,
    asyncHandler(async (req, res, next) => {
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
      res.json({ token, user: { id: user.id } });
    })
  );

  module.exports = router;
