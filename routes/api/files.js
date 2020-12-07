const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const upload = multer();
const { authenticated } = require("../../auth");
const { File, User, Folder } = require("../../db/models");

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


router.post("/",
    upload.any(), // Parses from data in req.body and req.files
    // [...authenticated],
    asyncHandler(async function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next({ status: 422, errors: errors.array() });
        }

        // Get file reference
        const file = req.files[0];

        // Create params object for S3
        const params = {
            Bucket: "bitbin-files",
            Key: Date.now().toString() + file.originalname, // Uniquely identifies an object in a bucket
            Body: file.buffer,
            ACL: "public-read",
            ContentType: file.mimetype,
        };

        const promise = s3.upload(params).promise();

        const uploadedFile = await promise;

        req.body.itemUrl = uploadedFile.Location;

        const newFile = await File.create({
            fileName: file.originalname,
            itemUrl: req.body.itemUrl,
            folderId: req.body.folderId,
            pinned: false
        });

        res.json({ file: newFile });
    }))

    module.exports = router;
