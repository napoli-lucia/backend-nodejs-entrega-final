import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import usersModel from "../dao/models/users.model.js"
import { userService, cartService } from "../repository/index.js";
import { SECRET_JWT } from "../utils/jwt.js";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./config.js"

const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieJWTExtractor = (req) => {
  //console.log("🚀 ~ cookieJWTExtractor ~ req:", req); 
  let token;
  if (req && req.cookies) {
    token = req.cookies["cookieToken"];
  }
  return token;
};

const initializePassport = () => {

  //REGISTER
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true, //password requerido
        usernameField: "email", //quiero usar el email
      },
      async (req, username, password, done) => {
        console.log("🚀 ~ username:", username)

        const { first_name, last_name, email, age } = req.body;

        try {
          console.log("***REGISTER STRATEGY***");

          // Busco al user por el email
          let user = await usersModel.findOne({ email });
          console.log("🚀 ~ file: passport.config.js ~ user:", user);
          
          //Si el usuario existe (null: no hay error, false: no se genero un user nuevo)
          if (user) {
            return done(null, false);
          }

          const result = await userService.addUser(first_name, last_name, email, age, password);

          return done(null, result.user);
          
        } catch (error) {
          return done(`error getting user ${error}`);
        }
      }
    )
  );

  //LOGIN
  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          console.log("***LOGIN STRATEGY***");

          const user = await userService.getUser(username,password);

          if (user.error) {
            return done(null, false);
          }

          //Se loguea correctamente
          return done(null, user);

        } catch (error) {
          console.log("🚀 ~ file: passport.config.js ~ error:", error);
          return done(error);
        }
      }
    )
  );

  //LOGIN GITHUB
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("🚀 ~ profile:", profile);
        try {
          let user = await usersModel.findOne({ email: profile._json?.email });
          if (!user) {
            //si no existe el usuario
            const name = profile._json.name.split(" ");
            let addNewUser = {
              first_name: name[0],
              last_name: name[1],
              email: profile._json?.email,
              age: 0,
              password: "",
              cart: (await cartService.addCart()).cart
            };
            let newUser = await usersModel.create(addNewUser);
            done(null, newUser);
          } else {
            // ya existia el usuario
            done(null, user);
          }
        } catch (error) {
          console.log("🚀 ~ error:", error)
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
    //null: que no hay error
    //pasamos el id del usuario que registramos
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersModel.findById({ _id: id });
    done(null, user);
  });

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJWT.fromExtractors([cookieJWTExtractor]),
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        console.log("🚀 ~ jwtPayload INFO:", jwtPayload);

        try {
          return done(null, jwtPayload);
          
        } catch (error) {
          return done(error);
        }
      }
    )
  );

};

export default initializePassport;