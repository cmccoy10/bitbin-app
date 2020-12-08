const express = require("express");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, validateEmailAndPassword } = require("../../utils");
const { getUserToken, requireAuth } = require("../../auth");
const router = express.Router();
const { User, Folder } = require("../../db/models");
const bcrypt = require("bcryptjs");


router.post(
    "/",
    validateEmailAndPassword,
    asyncHandler(async (req, res) => {
      const { firstName, lastName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstName, lastName, email, hashedPassword });

      Folder.create({
        "name": "trashBin",
        "pinned": false,
        "ownerId": user.id,
        "isTrashBin": true,
        "isRoot": false,
      }).then((trashBin) => user.trashBinId = trashBin.id)

      Folder.create({
        "name": "root",
        "pinned": false,
        "ownerId": user.id,
        "isTrashBin": false,
        "isRoot": true,
      }).then((root) => user.personalFolderId = root.id)

      await user.save();

      const token = getUserToken(user);
      res.cookie("token", token);
      res.status(201).json({
        userObj: {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "avatarUrl": user.avatarUrl,
            "trashBinId": user.trashBinId,
            "personalFolderId": user.personalFolderId
        },
        user: { id: user.id },
        token,
      });
    })
);


router.get(
  "/:id",
//   requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ userObj: {
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
