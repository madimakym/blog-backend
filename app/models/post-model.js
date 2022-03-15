const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    libelle: {
        type: String
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: Boolean
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
}, {
    timestamps: true
});
PostSchema.method("toJSON", function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Post", PostSchema);