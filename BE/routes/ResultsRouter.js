import express from "express";
 
import { 
	getAllResults
	
} from "../controllers/ResultsController.js";
 
const router = express.Router();
 
router.get('/', getAllResults);
 
export default router;