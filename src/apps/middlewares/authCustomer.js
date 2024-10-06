const jwt = require('jsonwebtoken');
const config = require('config');

exports.verifyAuthentication = async (req, res, next) => {
    try {
        const verifyToken = req.headers["token"];
        if (!verifyToken) {
            return res.status(401).json("Authentication required !");
        } else {
            const accessToken = verifyToken.split(" ")[1];
            const secretKey = config.get("app.jwtAccessKey")
            jwt.verify(accessToken, secretKey, (err, decoded) => {
                if (err) {
                    return res.status(403).json("Authentication required !");
                }
            })
        }

        // let user = req.cookies['username']; res.send(`Cookie username: ${username}`)
        next();
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}