const express = require("express");
const member = express.Router();

//const db = require("../db/db");
const s3 = require("../s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const mongoosedb = require("../mongo/mongoose");

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
    // console.log(req.body);
    let newMember = req.body;
    console.log("user wants to add this", newMember);
    try {
        const addedMember = await mongoosedb.addNewMember(newMember);
        newMember.id = addedMember.id;
        // console.log("new Member", newMember);
        res.send({ success: true, newMember: newMember });
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
                const member_id = await mongoosedb.addNewMember(newMember);
                newMember.id = member_id.id;
                console.log("added new member with photo", newMember);
                res.json({ success: true, newMember: newMember });
                // res.send({ success: true });
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
        const member = await mongoosedb.getMemberById(req.params.id);
        res.json({ success: true, member: member });
        return;
    } catch (err) {
        console.log("error in get member by id", err);
        res.status(500).json({ success: false });
        return;
    }
});

member.post(
    "/api/upload-photo/:id",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        const id = req.params.id;
        console.log("user wants to add a photo photo");
        if (!req.file) {
            res.json({ success: false });
            return;
        } else {
            const url = s3.getLink(req.file.filename);
            // console.log(req.body);
            try {
                await mongoosedb.changeMemberPhoto(id, url);
                // newMember.id = member_id;
                res.json({ success: true, url: url });
                return;
            } catch (err) {
                console.log("error in upload member photo", err);
                res.status(500).json({ success: false });
                return;
            }
        }
    }
);
//with mongo
member.put("/api/update-bio/:id", async (req, res) => {
    console.log("user wants to update bio", req.body, req.params.id);
    try {
        await mongoosedb.updateMemberBio(req.params.id, req.body);
        res.json({ success: true });
        return;
    } catch (err) {
        console.log("error in update bio", err);
        res.status(500).json({ success: false });
        return;
    }
});

//with mongo
member.put("/api/add-relation", async (req, res) => {
    console.log("user wants to add relation", req.body);
    const { member_id, relative_id, type } = req.body;
    try {
        await mongoosedb.addRelation(member_id, type, relative_id);
        res.json({ success: true });
        return;
    } catch (err) {
        console.log(err);
        res.json({ success: false });
        return;
    }
});
//to-do change it when add a wall
member.get("/api/wall/:id", async (req, res) => {
    const { id } = req.params;
    console.log("user wants to see a wall", id);

    const memories = await mongoosedb.getWallMemories(id);
    console.log("messages for this wall", memories);
    if (memories.wall) {
        res.json({ success: true, wall: memories.wall });
        return;
    } else {
        res.json({ success: true, wall: [] });
        return;
    }
});
member.post("/api/wall/:id", async (req, res) => {
    console.log("user wants to add new memory", req.body);
    const { memory } = req.body;
    const { id } = req.params;
    const sender_id = req.session.userId;
    mongoosedb
        .addNewMemory(id, memory, sender_id)
        .then((newMemory) => {
            console.log("result on server", newMemory);
            res.json({ success: true, newMemory });
            return;
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false });
            return;
        });
});

module.exports.member = member;
