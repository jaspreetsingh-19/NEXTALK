let bcrypt = require("bcryptjs");
const user = require("../models/user.model");
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

async function register(req, res) {
    try {
        const { name, username, password } = req.body;
        const existinguser = await user.findOne({ username });

        if (existinguser) {
            return res.status(401).send({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            name,
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();


        const token = jwt.sign(
            {
                userId: savedUser._id,
                username: savedUser.username,
                name: savedUser.name
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            token: token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                username: savedUser.username
            }
        });

    } catch (error) {
        console.error("❌ Register Error:", error);
        return res.status(500).send({ success: false, message: "Error", error: error.message });
    }
}



async function login(req, res) {
    try {
        const { username, password } = req.body;
        const existinguser = await user.findOne({ username });

        if (!existinguser) {
            return res.status(401).send({ success: false, message: "User not found" });
        }

        const ismatch = await bcrypt.compare(password, existinguser.password);

        if (!ismatch) {
            return res.status(401).send({ success: false, message: "Invalid credentials" });
        }


        const token = jwt.sign(
            {
                userId: existinguser._id,
                username: existinguser.username,
                name: existinguser.name
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                id: existinguser._id,
                name: existinguser.name,
                username: existinguser.username
            }
        });

    } catch (error) {
        console.error("❌ Register Error:", error);
        return res.status(500).send({ success: false, message: "Error", error });
    }
}

function logout(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
}

function handlMe(req, res) {
    res.status(200).json({
        success: true,
        user: req.user
    })
}


module.exports = { register, login, logout, handlMe };