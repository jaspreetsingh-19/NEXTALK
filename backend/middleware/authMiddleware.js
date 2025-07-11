const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    } catch (e) {
        console.error("Token Invalid:", e.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;
