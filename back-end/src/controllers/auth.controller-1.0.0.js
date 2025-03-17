const User = require('../models/user.model-1.0.0');
const asyncHandler = require('express-async-handler');
const envConfiguration = require('../configurations/env.configuration-1.0.0');
const cookieHelper = require('../helpers/cookie.helper-1.0.0');

const { env } = envConfiguration;

const userInfo = asyncHandler(async(req, res) => {
    return res.status(200).json({ user: {
        _id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        nickName: req.user.nickName,
        profilePic: req.user.profilePic,
        profileSetup: req.user.profileSetup
    } });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const authToken = await user.generateAuthTokenAndSaveUser();
        cookieHelper.setJwtCookie(res, authToken, env);

        res.status(200).json({ 
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                nickName: user.nickName,
                profilePic: user.profilePic,
                profileSetup: user.profileSetup
            }
        });
    } catch (error) {
        if (error.message === "Login or password incorrect") {
            return res.status(401).json({ message: "Email or password incorrect" });
        }

        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

const register = asyncHandler(async(req, res) => {
    try {
        const user = await User.create(req.body);
        const authToken = await user.generateAuthTokenAndSaveUser();

        cookieHelper.setJwtCookie(res, authToken, env);

        res.status(201).json({ user : {
            _id: user._id,
            email: user.email,
            nickName: user.nickName,
            profilePic: user.profilePic,
            profileSetup: user.profileSetup
        } });
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
    userInfo,
    login,
    register,
    logout
};