import express from "express";
 
import { 
	getAllEvents,
	createEvent,
	deleteEvent
} from "../controllers/WCCController.js";
 
const router = express.Router();
 
router.get('/', getAllEvents);

router.post('/', createEvent);

router.delete('/:id', deleteEvent);
 
export default router;