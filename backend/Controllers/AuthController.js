const userModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
       
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'Your email already exists, you can login.',
                success: false
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Send success response
        res.status(201).json({
            message: 'Signup successful',
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

const signin = async (req, res) => { 
    try {
        const { email, password } = req.body;

    
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(403).json({
                message: 'Auth failed: Email or password is incorrect',
                success: false
            });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        
        if (!passCompare) {
            return res.status(403).json({
                message: 'Auth failed: Email or password is incorrect',
                success: false
            });
        }

        const jwttoken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET||'sabbir',
            { expiresIn: '24h' }
        );


        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwttoken,
            email,
            name: user.name
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    signin 
};
