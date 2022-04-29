import express from "express";

import {
    verifyLogin
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/", verifyLogin);

export default router;