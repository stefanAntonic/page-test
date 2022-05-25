const mongoose = require("mongoose");

const studentStatusSchema = new mongoose.Schema(
  {
   
    regular: {
      type: String,
      required: true,
    },
    partTime: {
      type: String,
      required: true
    }

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Status",
  studentStatusSchema
);
