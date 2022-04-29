import express from "express";
 
import { 
	getWR
	
} from "../controllers/WRController.js";
 
const router = express.Router();
 
router.get('/', getWR);
 
export default router;