import express from "express";
import 'dotenv/config.js';
import db from "./config/database.js";
import climberRoutes from "./routes/ClimberRouter.js";
import WCCRoutes from "./routes/WCCRouter.js";
import cors from "cors";

const app = express();
 
try {
	await db.authenticate();
	console.log('Database connected...');
} catch (error) {
	console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/events', WCCRoutes);
app.use('/climbers', climberRoutes);


 
app.listen(process.env.SERVER_PORT, () => console.log(`Server running at port ${process.env.SERVER_PORT}`));