import { Router } from "express";
import passport from "passport";
import checkAuthJwt from "../middleware/auth-jwt.middleware.js";
import authMdw from "../middleware/auth.middleware.js"
import {
  logoutCtrl,
  loginCtrl,
  registerCtrl,
  changePswCtrl,
  githubCtrl,
  githubCallbackCtrl,
  currentCtrl,
  sendChangePswMailCtrl,
  changeRoleCtrl,
  getAllUsersCtrl,
  deleteOneUserCtrl,
  deleteOldUsersCtrl
} from "../controller/users.controller.js";

const router = Router();

// LOGOUT
router.get("/logout", logoutCtrl);

// LOGIN
router.post("/login", loginCtrl);

// REGISTER
router.post("/register", registerCtrl);

// CHANGE PASSWORD
router.post("/changePsw", changePswCtrl);

// SEND CHANGE PASSWORD MAIL
router.post("/changePswMail", sendChangePswMailCtrl);

// LOGIN GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubCtrl
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallbackCtrl
);

// CURRENT
router.get("/current", checkAuthJwt("jwt"), currentCtrl);

// GET ALL USERS
router.get("/", authMdw(["ADMIN"]), getAllUsersCtrl);

// DELETE ONE USER
router.delete("/:email", authMdw(["ADMIN"]), deleteOneUserCtrl);

// DELETE OLD USERS
router.delete("/users/:time", authMdw(["ADMIN"]), deleteOldUsersCtrl);

// CHANGE ROLE
// router.post("/premium/:uid", changeRoleCtrl);
router.post("/:email", authMdw(["ADMIN"]), changeRoleCtrl);


export default router;