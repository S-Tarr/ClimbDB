import express from "express";
 
import { 
	getAllResults,
	deleteResult
} from "../controllers/ResultsController.js";
 
const router = express.Router();
 
router.get('/', getAllResults);
router.delete('/:id', deleteResult);
 
export default router;