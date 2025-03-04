const setJwtCookie = (res, authToken, env) => {
    res.cookie("jwt", authToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: env !== "dev",
    });
}

const unsetJwtCookie = (res) => {
    res.cookie("jwt", "", {
        maxAge: 0
    })
}

module.exports = {
    setJwtCookie,
    unsetJwtCookie
};