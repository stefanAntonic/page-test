const express = require('express')
const passport = require('passport');
const { loginFailed, loginSuccess, logoutUser } = require('../controllers/authController');
const router = express.Router({mergeParams: true})




// Route 
router.get("/login/success", loginSuccess)
router.get("/login/failed", loginFailed)
router.get("/logout",logoutUser)
router.get('/google', passport.authenticate("google",{scope:["profile"]}))
router.get('/google/callback', passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    faliureREdirect: "/login/failed"

}))



module.exports = router;