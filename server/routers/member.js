const express = require("express");
const member = express.Router();

const db = require("../db/db");

const s3 = require("../s3");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

member.post("/api/add-member", async (req, res) => {
    console.log(req.body);
    let newMember = req.body;
    console.log("user wants to add this", newMember);
    try {
        const addedMember = await db.addMember(newMember);
        newMember.id = addedMember.rows[0].id;
        res.send({ success: true, newMember });
        return;
    } catch (err) {
        console.log("error in adding member", err);
        res.status(500).send({ success: false });
        return;
    }
});

member.post(
    "/api/add-member-and-photo",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        console.log("user wants to add member with photo");
        if (!req.file) {
            res.json({ success: false });
            return;
        } else {
            const url = s3.getLink(req.file.filename);
            console.log(req.body);
            let newMember = { ...req.body, image_url: url };
            console.log("new member with photo", newMember);
            try {
                const member_id = await db.addMember(newMember);
                newMember.id = member_id;
                res.json({ success: true, newMember });
                return;
            } catch (err) {
                console.log("error in adding member with photo", err);
                res.status(500).json({ success: false });
                return;
            }
        }
    }
);

member.get("/api/member/:id", async (req, res) => {
    console.log("Get member info", req.params.id);
    try {
        const member = await db.getMemberInfoById(req.params.id);
        res.json({ success: true, member: member.rows[0] });
        return;
    } catch (err) {
        console.log("error in get member by id", err);
        res.status(500).json({ success: false });
        return;
    }
});

module.exports.member = member;