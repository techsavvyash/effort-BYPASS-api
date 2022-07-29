const express = require("express");
// import express from "express";
const app = express();
const cors = require("cors");
// import cors from "cors";
const session = require("express-session");
// import session from "express-session";
const connectToDB = require("./config/db.js");
// import { connectToDB } from "./config/db.js";
// const { Axios } = require("axios");
// import axios from "axios";
const axios = require("axios").default;
const request = require("request");
const { response } = require("./routes/comment");
require("dotenv").config();
// const http = require("http").createServer(app)
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:                 process.env.CORS_URL,
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
app.use(require("./routes/compile"));

app.listen(process.env.PORT || 8000, () => {
  console.log(`server started at http://localhost:${process.env.PORT || 8000}`);
  request(
    {
      url: `${process.env.SPOJ_PROBLEMS_ENDPOINT}/test?access_token=${process.env.SPOJ_PROBLEMS_ACCESS_TOKEN}`,
      method: "GET",
    },
    (err, res, body) => {
      if (err) {
        console.log("Connection Problem: ", err);
      }

      if (res) {
        //console.log("res: ", res);
        //console.log("body: ", body);
        if (res.statusCode === 200) {
          console.log(JSON.parse(res.body)); // test message in JSON
        } else {
          if (res.statusCode === 401) {
            console.log("Invalid access token");
          }
        }
      }
    }
  );
  request(
    {
      url: `${process.env.SPOJ_COMPILER_ENDPOINT}/test?access_token=${process.env.SPOJ_COMPILER_ACCESS_TOKEN}`,
      method: "GET",
    },
    (err, res, body) => {
      if (err) {
        console.log("Connection Problem: ", err);
      }

      if (res) {
        //console.log("res: ", res);
        //console.log("body: ", body);
        if (res.statusCode === 200) {
          console.log(JSON.parse(res.body)); // test message in JSON
        } else {
          if (res.statusCode === 401) {
            console.log("Invalid access token");
          }
        }
      }
    }
  );
});
