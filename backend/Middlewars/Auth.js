const jwt = require('jsonwebtoken');

const ensureAuthenticated =(req, res, next) => {
   
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

      
        console.log("Decoded Token:", decoded);

        
        req.user = decoded;

   
        next();
    } catch (error) {

        console.error("JWT Verification Error:", error);

        return res.status(403).json({
            message: "Unauthorized: JWT token is invalid or expired",
            success: false
        });
    }
};

module.exports = ensureAuthenticated;



