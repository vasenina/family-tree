const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db/db");
// const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");

const { member } = require("./routers/member.js");
const { auth } = require("./routers/auth.js");
const { family } = require("./routers/family.js");

app.use(compression());

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});
app.use(
    cookieSession({
        secret:
            process.env.SESSION_SECRET || require("./passwords").sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(member);
app.use(auth);
app.use(family);

app.get("/clear", (req, res) => {
    req.session = null;
    console.log("Clear cookies", req.session);
    res.redirect("/");
    return;
});

app.get("/user-cookie/id.json", function (req, res) {
    req.session.userId = "6202ede11e18a0e1f4564075";
    res.json({
        userId: req.session.userId,
        //last: req.session.last,
        // first: req.session.first,
    });
});

app.get("/api/relations", async (req, res) => {
    console.log("user wants to get relations");
    try {
        const relations = await db.getAllRelations();
        res.json({ success: true, relations: relations.rows });
        return;
    } catch (err) {
        console.log("Error in get relations", err);
        res.status(500).json({ success: false });
        return;
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
