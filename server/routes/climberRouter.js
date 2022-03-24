import express from "express";
 
import { 
    getAllClimbers,
    createClimber,
    getClimberById,
    updateClimber,
    deleteClimber
} from "../controllers/Climber.js";
 
const router = express.Router();
 
router.get('/', getAllClimbers);
router.get('/:id', getClimberById);
router.post('/', createClimber);
router.patch('/:id', updateClimber);
router.delete('/:id', deleteClimber);
 
export default router;