require('dotenv').config()
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const passport = require("passport");
const passportSetup = require("./passport/passport");

const app = express();
const port = process.env.PORT || 5000
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
connectDB();
app.use(
  cookieSession({
    name: "sesion",
    keys: ["page"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Routes
app.use("/api/students", require("./routes/StudentsRoute"));
app.use("/api/course", require("./routes/CouresRoute"));
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/status", require("./routes/StatusRoute"));
app.use("/auth", require("./routes/AuthRoute"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
