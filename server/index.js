require('dotenv').config();
const 
    express  = require('express'),
    { json } = require('body-parser'),
    session  = require('express-session'),
    app      = express(),
    port     = process.env.PORT || 3000,

    checkForSession = require(`${__dirname}/middleware/checkForSession`),
    swag            = require(`${__dirname}/controllers/swag_controller`),
    auth            = require(`${__dirname}/controllers/auth_controller`),
    cart            = require(`${__dirname}/controllers/cart_controller`),
    search          = require(`${__dirname}/controllers/search_controller`);

app.use(json());
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }
))

app.use(checkForSession);

app.get('/api/swag', swag.read);

app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);

app.post('/api/cart', cart.add);
app.post('/api/cart/checkout', cart.checkout);
app.delete('/api/cart', cart.destroy);

app.get('/api/search', search.search);

app.listen(port, () => console.log(`Listening to port ${port}`))