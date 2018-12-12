const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkforSession  = require('./middlewares/checkforSession');
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");
const cart_controller = require("./controllers/cart_controller");
const search_controller = require("./controllers/search_controller")

const app = express();
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 12
    }

 }))

 app.use(checkforSession);
 app.use( express.static( `${__dirname}/../build` ) );

 app.get("/api/swag", swag_controller.read);
 app.post("/api/login", auth_controller.login);
 app.post("/api/register", auth_controller.register);
 app.post("/api/signout", auth_controller.signout);
 app.get("/api/user", auth_controller.getUser);

 app.post("/api/cart", cart_controller.add);
 app.post("/api/cart/checkout", cart_controller.checkout)
 app.delete("/api/cart", cart_controller.delete )

 app.get("/api/search", search_controller.search)

const PORT = process.env.SERVER_PORT || 4000;
 app.listen(PORT, ()=>{
     console.log(`Server is listening on Port ${PORT} 🎄`)
 })