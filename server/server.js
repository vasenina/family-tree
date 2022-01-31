const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db/db");
// const { hash, compare } = require("./bc");
const cookieSession = require("cookie-session");

const { member } = require("./routers/member.js");

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

app.get("/clear", (req, res) => {
    req.session = null;
    console.log("Clear cookies", req.session);
    res.redirect("/");
    return;
});

app.get("/user-cookie/id.json", function (req, res) {
    req.session.userId = 1;
    res.json({
        userId: req.session.userId,
        //last: req.session.last,
        // first: req.session.first,
    });
});

function generateFamily(family, relations) {
    //console.log("relations", relations);
    let newFamily = family.map((member) => {
        let newMember = {};
        const id = member.id;

        const relationForThisId = relations.filter((relation) => {
            if (relation.member_id === id || relation.relative_id === id) {
                return relation;
            }
        });

        for (let i = 0; i < relationForThisId.length; i++) {
            const relative_id =
                relationForThisId[i].member_id === id
                    ? relationForThisId[i].relative_id
                    : relationForThisId[i].member_id;
            if (relationForThisId[i].type === "spouse") {
                if (newMember.spouse) {
                    newMember.spouse.push(relative_id);
                } else {
                    newMember.spouse = [relative_id];
                }
            } else if (relationForThisId[i].type === "sibling") {
                if (newMember.sibling) {
                    newMember.sibling.push(relative_id);
                } else {
                    newMember.sibling = [relative_id];
                }
            } else if (relationForThisId[i].type === "other") {
                if (newMember.other) {
                    newMember.other.push(relative_id);
                } else {
                    newMember.other = [relative_id];
                }
            } else if (relationForThisId[i].type === "parent") {
                if (relationForThisId[i].member_id === id) {
                    if (newMember.child) {
                        newMember.child.push(relative_id);
                    } else {
                        newMember.child = [relative_id];
                    }
                } else {
                    if (newMember.parent) {
                        newMember.parent.push(relative_id);
                    } else {
                        newMember.parent = [relative_id];
                    }
                }
            } else if (relationForThisId[i].type === "child") {
                if (relationForThisId[i].member_id === id) {
                    if (newMember.parent) {
                        newMember.parent.push(relative_id);
                    } else {
                        newMember.parent = [relative_id];
                    }
                } else {
                    if (newMember.child) {
                        newMember.child.push(relative_id);
                    } else {
                        newMember.child = [relative_id];
                    }
                }
            }
            //parents, child, other, sibling
        }

        newMember = { ...member, ...newMember };
        return newMember;
    });
    return newFamily;
}

app.get("/family", async (req, res) => {
    console.log("User want to see all family");
    try {
        const family = db.getAll();
        const relations = db.getAllRelations();
        Promise.all([family, relations]).then((values) => {
            const newFamily = generateFamily(values[0].rows, values[1].rows);
            res.send({ success: true, family: newFamily });
            return;
        });
    } catch (err) {
        console.log("error im GET family", err);
        res.status(500).send({ success: false });
        return;
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
