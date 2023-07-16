const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDatabase');

const routerSignUp = require('./routes/RouterSignUp');
const routerLogin = require('./routes/RouterLogin');
const routerLogout = require('./routes/RouterLogout');
const routerHome = require('./routes/RouterHome');
const routerAdmin = require('./routes/RouterAdmin');
const routerAuth = require('./routes/RouterAuth');
const routerRefresh = require('./routes/RouterRefresh');

let app = express();

dotenv.config();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true,
}));

app.use(session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

app.use('/signup', routerSignUp);
app.use('/login', routerLogin);
app.use('/logout', routerLogout);
app.use('/home', routerHome);
app.use('/admin', routerAdmin);
app.use('/auth', routerAuth);
app.use('/refresh', routerRefresh);

connectDB();

app.listen(PORT, () => {
    console.log('Successfully Running on Port:', PORT);
})