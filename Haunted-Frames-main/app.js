// // app.js
// const path = require('path');
// const express = require('express');
// const app = express();

// // ---- Parsers & logging should come FIRST ----
// app.use(express.json());                              // ✅ parse JSON (Postman raw → JSON)
// app.use(express.urlencoded({ extended: false }));     // ✅ parse HTML form posts
// app.use((req, res, next) => {                         // ✅ simple request logger
//   console.log(`[REQ] ${req.method} ${req.originalUrl}`);
//   next();
// });

// // ---- Static & views ----
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // ---- Debug routes (safe to keep while testing) ----
// app.get('/ping', (req, res) => res.status(200).send('pong'));
// app.post('/test', (req, res) => {
//   console.log('[BODY]', req.body);
//   res.status(201).json({ ok: true });
// });

// // ---- Your pages ----
// app.get('/madlibs', (req, res) => res.render('madlibs'));
// app.get('/', (req, res) => res.render('home'));

// // ---- Mount real routers AFTER parsers ----
// const authRoutes = require('./routes/authRoutes');
// // If authRoutes defines router.post('/signup') etc,
// // this mounts them at exactly /signup, /login, etc.
// // If you want a prefix, do: app.use('/api/auth', authRoutes)
// app.use(authRoutes);

// // (Optional) 404 handler to see mistyped paths
// app.use((req, res) => res.status(404).send('Not found'));


// //cookies
// app.get('/set-cookies', (req, res) => {
  
//   res.setHeader('Set-Cookie', 'newUser=true');    
//   res.send('you got the cookies!');



// });app.get('/read-cookies', (req, res) => {

// });

// module.exports = app;

// app.js
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ---- Parsers & logging ----
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(cookieParser());

// ---- Static & views ----
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ---- Basic pages ----
app.get('/madlibs', (req, res) => res.render('madlibs'));
app.get('/', (req, res) => res.render('home'));

// ---- Auth routes (/signup, /login, /logout) ----
app.use(authRoutes);

// 404
app.use((req, res) => res.status(404).send('Not found'));

module.exports = app;
