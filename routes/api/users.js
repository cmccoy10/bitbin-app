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

      const trashBin = await Folder.create({
        "name": "Deleted files",
        "pinned": false,
        "ownerId": user.id,
        "isTrashBin": true,
        "isRoot": false,
      })

      const personalFolder = await Folder.create({
        "name": "Personal",
        "pinned": false,
        "ownerId": user.id,
        "isTrashBin": false,
        "isRoot": true,
      })

      await user.update({ "trashBinId": trashBin.id });
      await user.update({ "personalFolderId": personalFolder.id });

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
