const jwt = require('jsonwebtoken');
const User = require('../models/user.model-1.0.0');
const envConfiguration = require('../configurations/env.configuration-1.0.0');

const { jwt_key } = envConfiguration;

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const authToken = req.header('Authorization').replace('Bearer ', '');
            const decodedToken = jwt.verify(authToken, jwt_key);

            const user = await User.findOne({ _id: decodedToken._id });

            if (!user) {
                throw new Error('Invalid JWT Token');
            }

            req.authToken = authToken;
            req.user = user;

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).send('Access forbidden: insufficient rights');
            }

            next();
        } catch (error) {
            res.status(401).send('Please log yourself in');
        }
    };
};

module.exports = authMiddleware;