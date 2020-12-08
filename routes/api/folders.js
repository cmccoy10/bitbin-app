const express = require("express");
const { check } = require("express-validator");
const { authenticated } = require("../../auth");
const asyncHandler = require("express-async-handler");
const { getUserToken, requireAuth } = require("../../auth");
const { User, Folder, File, ParentFolder } = require("../../db/models");


const router = express.Router();


router.get("/:id/files", asyncHandler(async(req, res) => {
    const folderId = req.params.id;
    const files = await File.findAll({where: { folderId }});
    return res.status(200).json(files);
}));


router.get("/:id", asyncHandler(async(req, res) => {
    const parentId = req.params.id;
    const list = await ParentFolder.findAll({
        where: {
            parentId
        },
        include: "child",
        attributes: []
    });
    const files = {};
    list.forEach(item => {
        if (item.child){
            files[item.child.id] = item.child
        }
    });
    return res.status(200).json(files);
}));


module.exports = router;
