const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

const secret = 'secret123'

router.post('/login', (req, res) => {

	if (req.body.username===mockUser.username && req.body.password === mockUser.password) {
		res.json(jwt.sign({ username: mockUser.username }, secret));
	}
	else {
		res.status(400)
		res.json({error: 'Invalid username or password'})
	}
	
});

router.get('/profile', (req, res) => {
	try {
		const token = req.headers['authorization'];
		jwt.verify(token, secret);
		res.status(200).json({ profile: mockUser.profile });
	} catch (err) {
		res.status(401).json('Unauthorized');
	}
});

module.exports = router;
