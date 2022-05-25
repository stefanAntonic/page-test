//Google auth login falilure handler func
const loginFailed = (req, res) => {
  res.status(401).json({
    success: false,
    message: "Connection faliure",
  });
};

const loginSuccess = (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "Successufull connection",
      user: req.user,
      // cookies: req.cookies
    });
  } else {
    res.json({
      message: 'Something wrong, there is no user'
    })
  }
};

const logoutUser = (req, res) => {
  req.logout();
  console.log("Session over");
  res.redirect("http://localhost:3000");
};

module.exports = {
  loginFailed,
  loginSuccess,
  logoutUser,
};
