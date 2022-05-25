const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Molomo vas dodajte ime'],
    },
    email: {
      type: String,
      required: [true, 'Molimo vas dodajte email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Molimo vas dodajte lozinku'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)