const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add userId"],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [
        true,
        "Please add some unique text that best describes your bookmark collection",
      ],
    },
    collectionType: {
      type: String,
      required: true,
      default: "Public",
    },
    image: {
      type: Object,
      default: {},
    },
    authorName: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
