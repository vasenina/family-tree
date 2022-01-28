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
    console.log("DB: I'm adding a new member");
    // const q = `INSERT INTO users (first, last, email, password)
    //             VALUES ($1, $2, $3, $4)
    //             RETURNING id;`;
    // const params = [userFirst, userLast, userEmail, userPW];
    return db.query(q, params);
};
