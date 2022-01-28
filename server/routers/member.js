const express = require("express");
const member = express.Router();

const db = require("../db/db");

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

module.exports.member = member;
