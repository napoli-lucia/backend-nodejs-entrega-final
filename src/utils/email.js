import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_PSW } from "../config/config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_PSW,
    },
});