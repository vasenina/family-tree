const express = require("express");
const family = express.Router();

const mongoosedb = require("../mongo/mongoose");

family.get("/get-family", async (req, res) => {
    console.log("User want to see all family");

    try {
        const family = await mongoosedb.getFamily();
        res.json({ success: true, family: family });
        return;
    } catch (err) {
        console.log("error im GET family", err);
        res.status(500).json({ success: false });
        return;
    }
});

module.exports.family = family;
