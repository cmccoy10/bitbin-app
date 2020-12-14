const express = require("express");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors, validateEmailAndPassword } = require("../../utils");
const { getUserToken, requireAuth } = require("../../auth");
const router = express.Router();
const { User, Folder, File, sequelize } = require("../../db/models");
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
            "email": user.email,
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
        "email": user.email,
        "avatarUrl": user.avatarUrl,
        "trashBinId": user.trashBinId,
        "personalFolderId": user.personalFolderId
    }});
  })
);

router.get("/:id/recent", asyncHandler(async(req, res) => {
    const ownerId = req.params.id;
    const folders = await Folder.findAll({
        where: {
            ownerId
        },
        group: ["Folder.id"],
        order: [[sequelize.fn('MAX', sequelize.col('createdAt')), 'DESC']],
        limit: 5
    });
    // TOD-DO Need to exclude files/folders that are in "Deleted files" folder
    const files = await File.findAll({
        include: [{
            model: Folder,
            where: {
                ownerId
            },
            attributes: []
        }],
        group: ["File.id", "Folder.id"],
        order: [[sequelize.fn('MAX', sequelize.col('File.createdAt')), 'DESC']],
        limit: 5
    });

    const data = [...folders, ...files];

    const sortedData = data.sort(function (a, b) {
        const aDate = Date.parse(a.createdAt);
        const bDate = Date.parse(b.createdAt);
        if (aDate < bDate) {
            return 1
        }

        if (aDate > bDate) {
            return -1
        }

        return 0;
    });

    return res.json(sortedData);
}))

module.exports = router;
