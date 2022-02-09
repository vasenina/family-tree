const mongoose = require("mongoose");
const MemberModel = require("./memberModel");

mongoose
    .connect("mongodb://localhost:27017/familyTree", { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection with mongoose open");
    })
    .catch((err) => {
        console.log("Mongoose error", err);
    });

// const m = new MemberModel({ first: "FirstName", last: "LastName" });
// m.save()
//     .then((p) => {
//         console.log(p);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

module.exports.getFamily = () => {
    return MemberModel.find({}).select(
        "id first last image_url parent sibling spouse child other"
    );
};
