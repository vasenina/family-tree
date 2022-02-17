const mongoose = require("mongoose");
//const { memorySchema } = require("./memoryModel");

const memorySchema = new mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "sender" },
    memory_text: { type: String, axLength: 200 },
    date: { type: Date, default: Date.now },
});

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
    wall: [memorySchema],
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

memberSchema.methods.addNewMemoryToWall = async function (memory) {
    this.wall.unshift(memory);
    //console.log("new Memory", memory);

    const newMemory = this.wall[0];
    // console.log("addedsubdoc", newMemory);
    await this.save((err) => {
        if (err) {
            console.log("error in save", err);
            return null;
        }
    });
    return newMemory;
};

const MemberModel = mongoose.model("Member", memberSchema);

module.exports = MemberModel;
