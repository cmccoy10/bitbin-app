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
        attributes: ["parentId"]
    });
    const folders = {};
    list.forEach(item => {
        if (item.child) {
            folders[item.child.id] =
            {
                "id": item.child.id,
                "name": item.child.name,
                "pinned": item.child.pinned,
                "ownerId": item.child.ownerId,
                "parentId": item.parentId,
                "isTrashBin": item.child.isTrashBin,
                "isRoot": item.child.isRoot,
                "previousParentId": item.child.previousParentId
            }
        }
    });
    return res.status(200).json(folders);
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
        breadcrumbs.unshift(folder)
        childId = folder.id;
    }
    return res.status(200).json(breadcrumbs)
}));


router.put("/:id/move", asyncHandler(async(req, res) => {
    const childId = req.params.id;
    const { destination } = req.body;
    const child = await ParentFolder.findOne({
        where: {
            childId
        }
    });
    await child.destroy();
    await ParentFolder.create({ "parentId": destination, childId });
    return res.status(200).json(childId);
}));


router.put("/:id/restore", asyncHandler(async(req, res) => {
    const childId = req.params.id;
    const folder = await Folder.findByPk(childId);

    const { previousParentId } = req.body;
    const child = await ParentFolder.findOne({
        where: {
            childId
        }
    });
    await child.destroy();
    await folder.update({ "previousParentId": null });
    await ParentFolder.create({ "parentId": previousParentId, childId });
    return res.status(200).json(childId);
}));


router.delete("/:id/delete", asyncHandler(async(req, res) => {
    const childId = req.params.id;
    const { parentId } = req.body;
    const folder = await Folder.findByPk(childId);


    const child = await ParentFolder.findOne({
        where: {
            childId
        },
    });

    await folder.update({ "previousParentId": child.parentId });
    await child.destroy();

    await ParentFolder.create({ "parentId": parentId, childId});
    return res.status(200).json(childId);
}));

module.exports = router;
