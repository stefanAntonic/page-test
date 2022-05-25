const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },

    studentStatus: {
      type: String,
      required: [true, "Molimo Vas da dodate ime"],
    },
    indexNumber: {
      type: String,
      required: [true, "Molimo vas da dodate broj indeksa"],
    },
    year: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Students", studentSchema);
