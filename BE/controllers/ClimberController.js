import Climber from "../models/ClimberModel.js";
import db from "../config/database.js";
import { QueryTypes } from "sequelize";
 
export const getAllClimbers = async (req, res) => {
	try {
		const climbers = await Climber.findAll();
		res.json(climbers)
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}
 
export const getClimberById = async (req, res) => {
	try {
		const climber = await Climber.findAll({
			where: {
				id: req.params.id
			}
		});
		res.json(climber[0]);
	} catch (error) {
		res.json({ message: error.message });
	}  
}
 
export const createClimber = async (req, res) => {
	try {
		const max = await db.query(`SELECT MAX(id) as max FROM ${process.env.CLIMBER_TABLE}`, { type: QueryTypes.SELECT });
		await Climber.create({
			id: max[0].max+1,
			name: req.body.name,
			hometown: req.body.hometown
		});
		res.json({
			"message": "Climber Created"
		});
	} catch (error) {
		console.log(error.message);
		res.json({ message: error.message });
	}  
}
 
export const updateClimber = async (req, res) => {
	try {
		await Climber.update({
			name: req.body.name,
			hometown: req.body.hometown
		}, {
			where: {
				id: req.params.id
			}
		});
		res.json({
			"message": "Climber Updated"
		});
	} catch (error) {
		res.json({ message: error.message });
	}
}
 
export const deleteClimber = async (req, res) => {
	try {
		await Climber.destroy({
			where: {
				id: req.params.id
			}
		});
		res.json({
			"message": "Climber Deleted"
		});
	} catch (error) {
		res.json({ message: error.message });
	}  
}