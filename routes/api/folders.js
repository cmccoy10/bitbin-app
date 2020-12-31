const express = require("express");
const { check } = require("express-validator");
const { authenticated } = require("../../auth");
const asyncHandler = require("express-async-handler");
const { getUserToken, requireAuth } = require("../../auth");
const { User, Folder, File, ParentFolder } = require("../../db/models");
const multer = require("multer");
const upload = multer();

const router = express.Router();

// AWS
const AWS = require("aws-sdk");
const { awsKeys } = require("../../config");

// Updating config for S3
AWS.config.update({
    secretAccessKey: awsKeys.secretAccessKey,
    accessKeyId: awsKeys.accessKeyId,
    region: awsKeys.region
});

// Constructs a new service object
const s3 = new AWS.S3();


router.get("/:id/files", asyncHandler(async(req, res) => {
    const folderId = req.params.id;
    const files = await File.findAll({where: { folderId }});
    return res.status(200).json(files);
}));


router.get("/:id", requireAuth, asyncHandler(async(req, res) => {
    const parentId = req.params.id;

    const ownerCheck = await Folder.findOne({where: { id: parentId, ownerId: req.user.id }});
    console.log("OWNER CHECK\n\n", ownerCheck, "\n\n")
    if (!ownerCheck) {
        return res.status(401).end();
    }

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


router.delete("/:id", asyncHandler(async(req, res) => {
    const id = req.params.id;
    // Setting the target folder to delete as the first item to check in the array
    const children = [id]

    // While there are still child folders
    while (children.length) {
        let root = children.shift()
        // Find all direct files within current root folder
        const childFiles = await File.findAll({ where: { "folderId": root } });
        if (childFiles.length) {
            childFiles.map(async file => {
                const params = {
                    Bucket: "bitbin-files",
                    Key: file.key
                };
                // Delete all instances in S3 and Postgres
                s3.deleteObject(params, function(err, data) {
                    if (err) {
                        return res.json(err); // an error occurred
                    } else {
                        console.log(data);
                    }
                })
                await file.destroy();
            });
        }
        // Search for all relationships where current root folder is the parent
        const childFolders = await ParentFolder.findAll({ where: { "parentId": root } });
        if (!childFolders.length) {
            // If no child folders then delete the root folder itself
            const relationship = await ParentFolder.findOne({ where: { "childId": root } });
            const rootFolder = await Folder.findByPk(root);
            await relationship.destroy();
            await rootFolder.destroy();
        } else {
            // Otherwise queue up the next child folders to repeat the loop
            children.unshift(root);
            childFolders.forEach(folder => {
                children.unshift(folder.childId)
            });
        }
    }

    return res.status(200).json(id);
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
