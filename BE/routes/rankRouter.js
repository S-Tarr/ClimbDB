import express from "express";
 
import { 
	getRanks
	
} from "../controllers/RankController.js";
 
const router = express.Router();
 
router.get('/:SYear', getRanks);
router.get('/', getRanks);
 
export default router;