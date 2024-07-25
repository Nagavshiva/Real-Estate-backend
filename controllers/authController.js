const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Agent = require('../models/agentModel');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAgent = new Agent({ name, email, password: hashedPassword });
        await newAgent.save();
        res.status(201).send('Agent registered successfully');
    } catch (err) {
        res.status(500).json({ message: 'Error registering agent', error: err });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const agent = await Agent.findOne({ email });
        if (!agent || !await bcrypt.compare(password, agent.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: agent._id }, process.env.JWT_TOKEN, { expiresIn: '2d' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};
