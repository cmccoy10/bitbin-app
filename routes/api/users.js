const express = require("express");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../../utils");
const { getUserToken, requireAuth } = require("../../auth");
const router = express.Router();
const { User } = require("../../db/models");


router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const { id, username } = await User.findByPk(userId);
    res.json({ user: { id, username } });
  })
);

module.exports = router;
