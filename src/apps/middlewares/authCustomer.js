const jwt = require('jsonwebtoken');
const config = require('config');

exports.verifyAuthentication = async (req, res, next) => {
    // kiem tra client gui len co access token hay khong .
    try {
        // check dirty token validity

        //verify token 
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
                next();
            }
            )
        }

        // let user = req.cookies['username']; res.send(`Cookie username: ${username}`)

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}