const express = require("express");
const router = express.Router();
const {
    GetAllUsers,DeleteUser,CreateAllUsers,UpdateUser,FindUser,login
  } = require("./user.controller");

router.get("/allusers",GetAllUsers);
router.get("/allusers/:id", FindUser);
router.post("/userCreate",CreateAllUsers);
router.post("/login",login);
router.put("/userUpdate/:id",UpdateUser)
router.delete("/deleteUser/:id",DeleteUser)
module.exports = router;