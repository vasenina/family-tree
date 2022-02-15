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
        enum: ["male", "female"],
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
    wall: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "sender" },
            memory_text: { type: String, maxLength: 200 },
            date: { type: Date, default: Date.now },
        },
    ],
});

// Duplicate the ID field.
memberSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
memberSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

memberSchema.methods.addRelative = function (type, relative) {
    this[type].push(relative);
    return this.save();
};

memberSchema.methods.addNewMemoryToWall = function (memory) {
    this.wall.push(memory);
    return this.save();
};

const MemberModel = mongoose.model("Member", memberSchema);

module.exports = MemberModel;
