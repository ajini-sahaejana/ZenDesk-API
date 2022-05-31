const express = require("express");
const router = express.Router();

// MongoDB user model
const User = require("../models/User");

// Password handler
const bcrypt = require("bcrypt");

// Register
router.post("/register", (req, res) => {
  let { username, email, password } = req.body;
  username = username;
  email = email;
  password = password;

  if (username == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields.",
    });
  } else if (!/^[a-zA-Z]*$/.test(username)) {
    res.json({
      status: "FAILED",
      message: "Invalid username entered.",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered.",
    });
  } else if (password.length < 4) {
    res.json({
      status: "FAILED",
      message: "Password is too short.",
    });
  } else {
    // Checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          //User already exists
          res.json({
            status: "FAILED",
            message: "User already exists.",
          });
        } else {
          // Create user
          // Password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                username,
                email,
                password: hashedPassword,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "User Account Created.",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message:
                      "An error occured while creating a new user account.",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occured while hashing password.",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occured while check for an existing user.",
        });
      });
  }
});

// Login
router.post("/login", (req, res) => {
  let { email, password } = req.body;
  email = email;
  password = password;

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied.",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Passwords match
                res.json({
                  status: "SUCCESS",
                  message: "Login Successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occured while comparing passwords.",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials Entered.",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occured while check for an existing user.",
        });
      });
  }
});

// Logout

// //All Users
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

// // Get usernames
// router.post("/username", (req, res) => {
//   let { username } = req.body;
//   username = username;

//   if (username == "") {
//     res.json({
//       status: "FAILED",
//       message: "Empty credentials supplied.",
//     });
//   } else {
//     User.find({ username }).then((result) => {
//       if (result == "") {
//         res.json({
//           status: "FAILED",
//           message: "Invalid username entered",
//         });
//       } else {
//         res.json({
//           status: "SUCCESS",
//           message: "Usernames Showed",
//           data: result,
//         });
//       }
//     });
//   }
// });

// // Get user by usernames
// router.post("/username", (req, res) => {
//   let { username } = req.body;
//   username = username;

//   if (username == "") {
//     res.json({
//       status: "FAILED",
//       message: "Empty credentials supplied.",
//     });
//   } else {
//     User.find({ username }).then((result) => {
//       if (result == "") {
//         res.json({
//           status: "FAILED",
//           message: "Invalid username entered",
//         });
//       } else {
//         res.json({
//           status: "SUCCESS",
//           message: "Usernames Showed",
//           data: result,
//         });
//       }
//     });
//   }
// });

// Create User
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    company: req.body.company,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// User List
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

// Single User by ID
router.get("/:username", async (req, res) => {
  try {
    // console.log(req.params.username);
    const user = await User.findById(req.params.username);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update Specific User
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          company: req.body.company,
          email: req.body.email,
          role: req.body.role,
        },
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

//Delete Specific Post
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;

// POST /user < create user; body: company, email, role ✅
// GET /user < list users ✅
// GET /user/:id < single user; params: id ✅
// POST /user/:id < edit single user; body: company, email, role ✅
// DELETE /user/:id < delete single user; params: id ✅
