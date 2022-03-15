const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        libelle: {
            type: String,
        },
        description: {
            type: String,
        },
        visual: {
            type: String,
        },
        status: {
            type: Boolean,
        }
    },
    {
        timestamps: true
    }
);

CategorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Categories", CategorySchema);
