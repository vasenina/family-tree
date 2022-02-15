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

module.exports.addNewMember = (member) => {
    // console.log(me)
    return new MemberModel(member).save();
};

module.exports.getMemberById = (id) => {
    return MemberModel.findById(id);
};

module.exports.updateMemberBio = (id, newBio) => {
    return MemberModel.findByIdAndUpdate(id, newBio, { runValidators: true });
};

module.exports.changeMemberPhoto = (id, url) => {
    return MemberModel.findByIdAndUpdate(
        id,
        { image_url: url },
        { runValidators: true }
    );
};

module.exports.addRelation = async (id, type, relative_id) => {
    //add relationship to member and his relative
    if (type == "spouse" || type == "sibling" || type == "other") {
        const foundMember = await MemberModel.findOne({ _id: id });
        await foundMember.addRelative(type, relative_id);
        const foundRelative = await MemberModel.findById(relative_id);
        await foundRelative.addRelative(type, id);
    } else if (type == "parent") {
        const foundMember = await MemberModel.findOne({ _id: id });
        await foundMember.addRelative(type, relative_id);
        const foundRelative = await MemberModel.findById(relative_id);
        await foundRelative.addRelative("child", id);
    } else if (type == "child") {
        const foundMember = await MemberModel.findOne({ _id: id });
        await foundMember.addRelative(type, relative_id);
        const foundRelative = await MemberModel.findById(relative_id);
        await foundRelative.addRelative("parent", id);
    }
    return;
};

module.exports.getWallMemories = async (member_id) => {
    console.log("get a wall for this user", member_id);
    return MemberModel.findById(member_id).select("wall").populate({
        path: "wall.sender_id",
        model: "Member",
        select: "last first",
    });
};

module.exports.addNewMemory = async (id, memory, sender_id) => {
    const foundWallOwner = await MemberModel.findById(id);
    return foundWallOwner.addNewMemoryToWall({
        sender_id,
        memory_text: memory,
    });
};
