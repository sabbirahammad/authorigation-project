const jwt = require('jsonwebtoken');

const ensureAuthenticated =(req, res, next) => {
    // Extract Authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({
            message: "Unauthorized: JWT token is required",
            success: false,
        });
    }
    
    // Extract the token part from the "Bearer <token>" format
    // const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the same secret used when generating the token
        const decoded =jwt.verify(authHeader, process.env.JWT_TOKEN || "sabbirsammi");

        // Log the decoded token for debugging
        console.log("Decoded Token:", decoded);

        // Store the decoded payload (user information) in req.user
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Log the error for debugging
        console.error("JWT Verification Error:", error);

        return res.status(403).json({
            message: "Unauthorized: JWT token is invalid or expired",
            success: false
        });
    }
};

module.exports = ensureAuthenticated;



