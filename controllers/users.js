const bcrypt = require('bcryptjs/dist/bcrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require('../utilities/validator')


const register = async (req, res) => {
    try {
        const validationResult = registerValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json({ validationResult })
        }
        else {
            const { firstName, lastName, email, adress, admin, password } = req.body
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                res.status(400).json({ error: "Account already exist" })
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newRegister = new User({
                    firstName,
                    lastName,
                    email,
                    adress,
                    admin,
                    hashedPassword
                })
                await newRegister.save()
                res.status(201).json({
                    message: 'Account created successfully'
                });
            }

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json({ validationResult })
            return
        }

        const { email, password } = req.body
        const user = User.findOne({ email })
        if (!user) {
            res.status(401).json({ error: "Wrong email or password" })
            return;
        }

        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) {
            res.status(401).json({ error: "Wrong email or password" })
            return
        }

        user.password = undefined;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: `Welcome ${user.firstName}`,
            user,
            token
        });



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




module.exports = {
    register,
    login
}