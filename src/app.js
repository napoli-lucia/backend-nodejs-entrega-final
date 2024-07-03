import express from "express";
import _handlebars from "handlebars"
import handlebars from "express-handlebars";
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access";
import { Server } from "socket.io";
import mongoose from "mongoose";
import displayRoutes from "express-routemap";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";

// Internal imports
import __dirname from "./utils.js";
import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import viewsRoutes from "./routes/views.routes.js"
import authRoutes from "./routes/auth.routes.js"
import loggerRoutes from "./routes/loggers.routes.js"
import socketProducts from "./listeners/socketProducts.js";
import socketChat from "./listeners/socketChat.js";
import socketUsers from "./listeners/socketUsers.js";
import initializePassport from "./config/passport.config.js";
import {PORT,API_PREFIX,DB_NAME,MONGO_URI,SECRET_SESSION} from "./config/config.js"
import { dynamicLogger } from "./utils/logger.js";

console.log("SERVER");
const app = express();

const connection = mongoose
    //.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
    .connect(MONGO_URI, {
     dbName: `${DB_NAME}`,
    })
    .then((conn) => {
      console.log("CONNECTED TO MONGO, WELCOME!!!");
    })
    .catch((err) => {
      console.log("ERROR CONNECTION!!!", err);
});

// Logger
app.use(dynamicLogger);

const httpServer = app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });

const io = new Server(httpServer);

app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      store: mongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 60 * 3600, //sesion dura 1 hora
      }),
      secret: SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// config handlebars
//app.engine("handlebars", handlebars.engine());
app.engine('handlebars', handlebars.engine({
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}))
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'));

app.use(express.static("images")); 

app.get(`/${API_PREFIX}`, (req, res) => {
    res.send(`Bienvenido al manager de productos y carritos en el puerto ${PORT}!!!!`);
});


// PRODUCTS ROUTES
// /api/products
app.use(`/${API_PREFIX}/products`, productsRoutes)

// CARTS ROUTES
// /api/carts
app.use(`/${API_PREFIX}/carts`, cartsRoutes)

// VIEWS ROUTES
app.use("/", viewsRoutes);

// SESSION ROUTES
// /api/session
app.use(`/${API_PREFIX}/session`, authRoutes)

// LOGGERS ROUTES
// /api/loggerTest
app.use(`/${API_PREFIX}/loggerTest`, loggerRoutes)

function serverErrors(error, req, res, next) {
    console.log(error);
    return res.status(500).json({
        status: "error",
        message: "An internal server error occurred"
    })
};

app.use(serverErrors);


socketProducts(io);
socketChat(io);
socketUsers(io);