import Ranks from "../models/RankModel.js";
import Climbers from "../models/ClimberModel.js";
export const getRanks= async (req, res) => {
	try {
		const ranks = await Ranks.findAll(
            {
                
                order: [['Points', 'DESC']]
            }
            
        );
		res.json(ranks)
	} catch (error) {
		res.json({ message: error.message });
		console.log(error)
	}   
}


