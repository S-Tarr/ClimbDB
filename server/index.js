import express from "express";
import db from "./config/database.js";
import productRoutes from "./routes/index.js";
import cors from "cors";
import { 
    getAllClimbers,
    createClimber,
    getClimberById,
    updateClimber,
    deleteClimber
} from "./controllers/Climber.js";

const app = express();
 
try {
    await db.authenticate();
    getAllClimbers();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
 
app.listen(5000, () => console.log('Server running at port 5000'));