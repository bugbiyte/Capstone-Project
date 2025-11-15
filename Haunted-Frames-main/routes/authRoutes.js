// // routes/authRoutes.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// const router = express.Router();

// /** PAGES */
// router.get('/signup', (req, res) => res.render('signup'));
// router.get('/login',  (req, res) => res.render('login'));

// /** SIGNUP */
// // routes/authRoutes.js (signup)
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(409).json({ error: 'Email already registered' });

//     // ✅ pass plaintext as passwordHash; model hook will hash it
//     const user = await User.create({ email, passwordHash: password });

//     return res.status(201).json({ id: user._id.toString(), email: user.email });
//   } catch (err) {
//     console.error('Signup error:', err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });


// /** LOGIN */
// // routes/authRoutes.js (login)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//   const ok = await bcrypt.compare(password, user.passwordHash);
//   if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

//   return res.json({ ok: true, id: user._id.toString(), email: user.email });
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

module.exports = router;
