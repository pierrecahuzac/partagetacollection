const jwt = require("jsonwebtoken");


const jwtFunctions = {
  generateAndSetAccessToken(payload, res) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600, 
    });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600,
    });
    return accessToken;
  },
};

module.exports =jwtFunctions;
