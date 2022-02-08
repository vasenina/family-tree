const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
    },
    birthlast: [String],
    image_url: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    birth: {
        type: Date,
    },
    death: {
        type: Date,
    },
    gender: {
        type: String,
    },
    city: {
        type: String,
    },
    bio: {
        type: String,
    },
    parent: [mongoose.Schema.Types.ObjectId],
    child: [mongoose.Schema.Types.ObjectId],
    sibling: [mongoose.Schema.Types.ObjectId],
    spouse: [mongoose.Schema.Types.ObjectId],
    other: [mongoose.Schema.Types.ObjectId],
});

const MemberModel = mongoose.model("Member", memberSchema);
module.exports = MemberModel;
