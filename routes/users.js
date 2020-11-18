require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../Database/Database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let createToken = (name, email) => {
  const payload = {
    name: name,
    email: email
  };

  return jwt.sign(payload, process.env.SECRET_KEY);
}

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then(encryptedPassword => {
    User.findOne({
      where: {
        email
      }
    }).then(searchedUser => {
      if ( searchedUser ) {
        res.status(409).json({
          status: "error",
          message: "email exists"
        });
      } else {
        User.create({
          email,
          password: encryptedPassword,
          name,
          token: createToken(name, email)
        }).then(createdUser => {
          res.status(201).json({
            status: "success",
            message: "user created",
            data: createdUser
          });
        });
      };
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "email not found"
      });
    } else {
      bcrypt.compare(password, user.password).then(unEncryptedPassword => {
        if (!unEncryptedPassword) {
          res.status(401).json({
            status: "error",
            message: "wrong password"
          });
        } else {
          res.status(200).json({
            status: "success",
            data: user,
          });
        }
      });
    }
  });
});

router.post("/fb_login", (req, res) => {
  const { name, email, picture, fb_id } = req.body;
  User.findOne({
    where: {
      facebook_user_id: fb_id,
    }
  }).then(foundedUser => {
    if (foundedUser) {
      res.status(200).json({
        status: "success",
        message: "Already Registered",
        data: foundedUser
      });
    } else {
      User.create({
        name,
        email,
        photo_url: picture,
        facebook_user_id: fb_id,
        token: createToken(name, email)
      }).then(registeredUser => {
        res.status(200).json({
          status: "success",
          data: registeredUser
        });
      });
    }
  });
});

module.exports = router;
