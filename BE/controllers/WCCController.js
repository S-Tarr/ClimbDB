import WCC from "../models/WCCModel.js";
 
export const getAllEvents = async (req, res) => {
	try {
		const events = await WCC.findAll();
		res.json(events)
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}
export const getEventById = async (req, res) => {
	try {
		const event = await WCC.findAll({
			where: {
				id: req.params.id
			}
		});
		res.json(event[0]);
	} catch (error) {
		res.json({ message: error.message });
	}  
}

export const createEvent = async (req, res) => {
	try {
		// await Climber.create({name: req.body.name, weight: req.body.weight, hometown: req.body.hometown, isMale: req.body.isMale});
		//print(req.body)
		await WCC.create(req.body);
		res.json({
			"message": "Event Created"
		});
	} catch (error) {
		res.json({ message: error.message });
	}  
}
export const updateEvent = async (req, res) => {
	try {
		await WCC.update({
			location: req.body.location,
			startTime: req.body.startTime,
			endTime: req.body.endTime
		}, {
			where: {
				id: req.params.id
			}
		});
		res.json({
			"message": "Event Updated"
		});
	} catch (error) {
		res.json({ message: error.message });
	}
}

 
export const deleteEvent = async (req, res) => {
	try {
		await WCC.destroy({
			where: {
				id: Number(req.params.id)
			}
		});
		res.json({
			"message": "Event Deleted"
		});
	} catch (error) {
		res.json({ message: error.message });
	}  
}