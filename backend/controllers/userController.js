const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const JWT_SECRET = 'abc124';
// Registracija novog korisnika, post metoda
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({
      message: 'Molimo vas da popunite sva polja'
    })
    throw new Error('Please add all fields')
  }

  // Provjerava da li korisnik vec postoji u bazi na osnovu emaila
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({
      message: 'Korisnik vec postoji u bazi'
    })
    throw new Error('User already exists')
  }

  // Password hash 
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // Kreira novog korisnike u User kolekciji u db
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({
      message: 'Podaci nisu validni'
    })
    throw new Error('Invalid user data')
  }
})

// Prijavljuje postojeceg korisnika, post metoda
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Provjerava da li je korisnikov email u kolekciji
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({
      message: "Pogresni podaci, pokusajte ponovo"
    })
    throw new Error('Invalid credentials')
  }
})


// Podaci o prijavljenom korisniku, get metoda
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generise token (JWT)
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}