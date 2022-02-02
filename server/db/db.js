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
    const birth = member.birth ? member.birth : null;
    const death = member.death ? member.death : null;
    const bio = member.bio ? member.bio : null;
    const gender = member.gender ? member.gender : null;
    const city = member.city ? member.city : null;

    const q = `INSERT INTO members (first, last, image_url, birth, death, bio, gender, city)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id;`;
    const params = [first, last, image_url, birth, death, bio, gender, city];
    return db.query(q, params);
};

module.exports.updateMemberBio = (member, id) => {
    console.log("update bio", member);
    let params = [];

    let q = "UPDATE members SET ";

    let i = 1;
    for (key in member) {
        if (key != "id") {
            params.push(member[key]);
            q += ` ${key}=$${i},`;
            i++;
        }
    }
    params.push(id);
    q = q.replace(/.$/, " ") + ` WHERE id = $${i};`;
    console.log("DB: REQEST:", q, params);

    return db.query(q, params);
    //return;
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
    const q = `SELECT member_id, relative_id, type
                FROM relations;`;
    const params = [];
    return db.query(q, params);
};

module.exports.getMemberInfoById = (id) => {
    console.log("DB: user wants to see member", id);
    const q = `SELECT id, first, last, image_url,  birth, death, bio, gender, city
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

module.exports.addRelation = (member_id, relative_id, type) => {
    console.log("adding new relation");
    const q = `INSERT INTO relations (member_id, relative_id, type) 
    VALUES  ($1, $2, $3)`;
    const params = [member_id, relative_id, type];
    return db.query(q, params);
};
