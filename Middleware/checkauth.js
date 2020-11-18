require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        /*JWT is send with request header!
        Format of it: Authorization : Bearer <token>
        */
        const token = req.headers.authorization.split(" ")[1] || req.body.token || req.query.token;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decodedToken;  
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Auth failed"
        });
    }
} 