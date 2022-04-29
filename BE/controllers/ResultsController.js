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
 

 


