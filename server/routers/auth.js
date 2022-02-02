const express = require("express");
const auth = express.Router();
const db = require("../db/db");
const { hash, compare } = require("../bc");

auth.post("/login.json", (req, res) => {
    console.log("login", req.body);
    if (!req.body.password || !req.body.email) {
        console.log("No pw or email");
        res.json({
            success: false,
        });
        return;
    }
    db.getPassword(req.body.email)
        .then((hashFromDatabase) => {
            // console.log("hashFromDatabase", hashFromDatabase.rows[0].password);
            return compare(
                req.body.password,
                hashFromDatabase.rows[0].password
            );
        })
        .then((match) => {
            if (match) {
                return db.getUserId(req.body.email);
            } else {
                res.json({
                    success: false,
                });
                return;
            }
        })
        .then(({ rows }) => {
            console.log("users id and sign id:", rows[0].user_id);
            //here we should set cookies
            req.session.userId = rows[0].user_id;
            console.log("cookie", req.session.userId);
            //req.session.last = rows[0].last;
            //req.session.first = rows[0].first;
            res.json({
                success: true,
            });
            return;
        })
        .catch((err) => {
            console.log("error in compare pw", err);
            // const error = {}
            res.status(500).json({
                success: false,
            });
            return;
        });
});

auth.get("/logout", (req, res) => {
    req.session = null;
    console.log("Clear cookies", req.session);
    res.redirect("/");
    return;
});

module.exports.auth = auth;
