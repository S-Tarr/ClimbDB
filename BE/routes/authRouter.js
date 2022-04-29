import express from "express";

import {
    generateToken,
    validateToken
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/gettoken", generateToken);
router.post("/validate", validateToken);

export default router;