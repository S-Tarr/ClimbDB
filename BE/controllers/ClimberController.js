import Climber from "../models/ClimberModel.js";
 
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
		// await Climber.create({name: req.body.name, weight: req.body.weight, hometown: req.body.hometown, isMale: req.body.isMale});
		await Climber.create(req.body);
		res.json({
			"message": "Climber Created"
		});
	} catch (error) {
		res.json({ message: error.message });
	}  
}
 
export const updateClimber = async (req, res) => {
	try {
		await Climber.update({
			name: req.body.name,
			weight: req.body.weight,
			hometown: req.body.hometown,
			isMale: req.body.isMale
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