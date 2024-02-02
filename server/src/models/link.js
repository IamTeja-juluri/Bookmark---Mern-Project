const mongoose = require("mongoose");

const linkSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add userId"],
      trim: true,
      ref: "User",
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add collectionId"],
      trim: true,
      ref: "Collection",
    },
    link: {
      type: String,
      required: [true, "Please add your link"],
      trim: true, // removes space in email
    },
    linkName: {
      type: String,
      required: [true, "please provide the name for your bookmark"],
    },
    authorName: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true, //creates createdAt and updatedAt field
  }
);

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
