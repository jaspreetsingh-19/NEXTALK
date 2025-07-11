let express = require("express");
const { login, register, logout, handlMe } = require("../controller/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();




router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

router.get("/me", authMiddleware, handlMe)





module.exports = router;

