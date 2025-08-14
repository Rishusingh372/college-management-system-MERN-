const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Token is not valid" });

      if (!roles.includes(decoded.role))
        return res.status(403).json({ msg: "Access denied" });

      req.user = decoded;
      next();
    });
  };
};

module.exports = authMiddleware;
