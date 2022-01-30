const spicedPg = require("spiced-pg");

const database = "familytree";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgress:${username}:${password}:@localhost:5432/${database}`
);

console.log(`[db] connecting to ${database}`);

module.exports.addMember = (member) => {
    console.log("DB: I'm adding a new member", member);
    const first = member.first ? member.first : null;
    const last = member.last ? member.last : null;
    const image_url = member.image_url ? member.image_url : null;
    const q = `INSERT INTO members (first, last, image_url)
                 VALUES ($1, $2, $3)
                 RETURNING id;`;
    const params = [first, last, image_url];
    return db.query(q, params);
};

module.exports.getAll = () => {
    console.log("DB: user wants to see all");
    const q = `SELECT id, first, last, image_url
                FROM members;`;
    const params = [];
    return db.query(q, params);
};
module.exports.getAllRelations = () => {
    console.log("DB: user wants to see all");
    const q = `SELECT member1_id, member2_id, type
                FROM relations;`;
    const params = [];
    return db.query(q, params);
};

module.exports.getMemberInfoById = (id) => {
    console.log("DB: user wants to see member", id);
    const q = `SELECT id, first, last, image_url
                FROM members
                WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.changeMemberPhoto = (id, url) => {
    console.log("adding new photo");
    const q = `UPDATE members SET image_url = $2
    WHERE id = $1`;
    const params = [id, url];
    return db.query(q, params);
};
