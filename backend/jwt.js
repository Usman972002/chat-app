const jwt = require("jsonwebtoken");

const jwtMiddleWare = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "UnAuthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ err: "Invalid Token" });
  }
};

// Function to generate token
const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure : process.env.NODE_ENV !== "development",
  });
};

module.exports = { jwtMiddleWare, generateToken };
