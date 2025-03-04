const User = require('../models/user.model-1.0.0');
const asyncHandler = require('express-async-handler');
const envConfiguration = require('../configurations/env.configuration-1.0.0');
const cookieHelper = require('../helpers/cookie.helper-1.0.0');

const { env } = envConfiguration;

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const authToken = await user.generateAuthTokenAndSaveUser();

        cookieHelper.setJwtCookie(res, authToken, env);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const register = asyncHandler(async(req, res) => {
    try {
        const user = await User.create(req.body);
        const authToken = await user.generateAuthTokenAndSaveUser();

        cookieHelper.setJwtCookie(res, authToken, env);

        res.status(201).json({ user });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const logout = asyncHandler(async(req, res) => {
    try {
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
            return authToken.authToken !== req.authToken;
        })

        await req.user.save();

        cookieHelper.unsetJwtCookie(res);

        res.status(200).json({ logout: "successfull" });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    login,
    register,
    logout
};