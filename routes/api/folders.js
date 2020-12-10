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


router.post("/", asyncHandler(async(req, res) => {
    const { name, ownerId, parentId } = req.body;
    const folder = await Folder.create({ name, ownerId, parentId });
    await ParentFolder.create({"parentId":parentId, "childId":folder.id })
    return res.status(200).json(folder);
}));


router.put("/:id/editName", asyncHandler(async(req, res) => {
    const { name } = req.body;
    const folder = await Folder.findByPk(req.params.id);
    await folder.update({ name });
    return res.status(200).json(folder);
}));


router.get("/:id/breadcrumbs", asyncHandler(async(req, res) => {
    let childId = req.params.id;
    let breadcrumbs = []
    let currentFolder = await Folder.findByPk(childId);
    breadcrumbs.unshift({"id": currentFolder.id, "name":currentFolder.name});

    while (childId) {
        const response = await ParentFolder.findOne({
            where: {
                childId
            },
            include: "parent",
            attributes: []
        });
        if (!response) {
            childId = null;
            continue
        }
        let folder = {
            "id": response.parent.id,
            "name": response.parent.name
        }
        console.log("\n\nFolder Id", folder.id, "\n\n")
        breadcrumbs.unshift(folder)
        childId = folder.id;
    }
    return res.status(200).json(breadcrumbs)
}));


module.exports = router;
