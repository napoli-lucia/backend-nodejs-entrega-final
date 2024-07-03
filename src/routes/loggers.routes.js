import { Router } from "express";
import {
    loggerErrorCtrl,
    loggerWarningCtrl,
    loggerInfoCtrl,
    loggerHttpCtrl,
    loggerDebugCtrl 
} from "../controller/loggers.controller.js";

const router = Router();

router.get("/error", loggerErrorCtrl);
router.get("/warning", loggerWarningCtrl);
router.get("/info", loggerInfoCtrl);
router.get("/http", loggerHttpCtrl);
router.get("/debug", loggerDebugCtrl);


export default router;