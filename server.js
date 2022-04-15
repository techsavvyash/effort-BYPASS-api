const expr0ess = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

const connectToDB = require("./config/db");

require("dotenv").config();
// const http = require("http").createServer(app)
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    SameSite: "strict",
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_URL);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("crossDomain", true);
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).send("Hey, effort-BYPASS-api is up and running!");
});

//routes
app.use(require("./routes/auth"));
app.use(require("./routes/submission"));
app.use(require("./routes/contest"));
app.use(require("./routes/questions"));
app.use(require("./routes/solution"));
app.use(require("./routes/comment"));

app.listen(process.env.PORT || 8000, () => {
  console.log(`server started at http://localhost:${process.env.PORT || 8000}`);
});
