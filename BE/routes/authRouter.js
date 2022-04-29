import express from "express";

import {
    generateToken,
    validateToken,
    verifyLogin
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/", verifyLogin);
router.post("/gettoken", generateToken);
router.post("/validate", validateToken);

export default router;