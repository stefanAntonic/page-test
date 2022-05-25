const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true, 'Molimo vas da dodate kurs']
    },
    students:{
      type: Array,
      required: false
    }
    
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Courses", courseSchema);
