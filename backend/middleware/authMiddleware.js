const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const JWT_SECRET = "abc124"
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Uzima token iz hedera
      token = req.headers.authorization.split(' ')[1]

      // Verifikacija, dekodiranje tokena
      const decoded = jwt.verify(token, JWT_SECRET)

      // Uzima usera pomocu tokena
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({
        message: 'Nije autorizovano'
      })
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401).json({
      message: 'Nije autorizovano i nema tokena.'
    })
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }