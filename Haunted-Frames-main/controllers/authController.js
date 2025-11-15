// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 


const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  if (err.message && err.message.toLowerCase().includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signup_get = (req, res) => {
  res.render('signup', { title: 'Sign up', error: null });
};

const login_get = (req, res) => {
  res.render('login', { title: 'Login', error: null });
};

// const signup_post = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//        // 🔐 hash the password before saving
//     const passwordHash = await bcrypt.hash(password, 10)

//     const user = await User.create({ email, passwordHash });

//     const token = createToken(user._id);
//     res.cookie('jwt', token, {
//       httpOnly: true,
//       maxAge: maxAge * 1000,
//     });

//     // ⭐️ this is the big change: redirect instead of JSON
//     return res.redirect('/');
//   } catch (err) {
//     const errors = handleErrors(err);
//     console.log('signup error', errors);
//     return res.status(400).render('signup', {
//       title: 'Sign up',
//       error: 'Could not sign up – check your details.',
//     });
//   }
// };

const signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) hash the plain-text password
    const passwordHash = await bcrypt.hash(password, 10);


    // 2) create the user with email + passwordHash
    const user = await User.create({ email, passwordHash });

    // 3) create JWT
    const token = createToken(user._id);

    // 4) set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    // 5) redirect to home
    return res.redirect('/');
  } catch (err) {
    const errors = handleErrors(err);
    console.log('signup error', errors);
    return res.status(400).render('signup', {
      title: 'Sign up',
      error: 'Could not sign up – check your details.',
    });
  }
};


const login_post = async (req, res) => {
  try {

    console.log('🔥 login_post hit, body =', req.body);
    const { email, password } = req.body;

    // 1) find user by email
    const user = await User.findOne({ email });
    console.log('user from DB:', user);

    if (!user) {
      return res.status(400).render('login', {
        title: 'Login',
        error: 'Invalid email or password',
      });
    }

    // 2) compare plain password with stored hash
  console.log('passwordHash in DB:', user.passwordHash);
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    console.log('password match?', isMatch);

    if (!isMatch) {
      console.log('❌ password mismatch');
      return res.status(400).render('login', {
        title: 'Login',
        error: 'Invalid email or password',
      });
    }


    // 3) create JWT
    const token = createToken(user._id);

    // 4) set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    // 5) redirect to home
     console.log('✅ login success, redirecting to /');
    return res.redirect('/');
  } catch (err) {
    console.error('💥 login error', err);
    return res.status(500).render('login', {
      title: 'Login',
      error: 'Something went wrong.',
    });
  }
};

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
};



module.exports = { signup_get, login_get, signup_post, login_post, logout_get };

