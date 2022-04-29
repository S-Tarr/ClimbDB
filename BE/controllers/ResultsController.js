import Results from "../models/ResultsModel.js";
 
export const getAllResults = async (req, res) => {
	try {
		const results = await Results.findAll();
		res.json(results)
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}
 

  
export const deleteResult = async (req, res) => {
	try {
		await Results.destroy({
			where: {
				id: req.params.id
			}
		});
		res.json({
			"message": "Result Deleted"
		});
	} catch (error) {
		res.json({ message: error.message });
	}  
}


