import Climber from "../models/ClimberModel.js";
 
export const getAllClimbers = async (req, res) => {
    try {
        const climbers = await Climber.findAll();
        console.log(climbers)
        /*res.json(climbers).then(data => {
            console.log(data)
        });*/
    } catch (error) {
        //res.json({ message: error.message });
        console.log(error)
    }   
}
 
export const getClimberById = async (req, res) => {
    try {
        const climber = await Climber.findAll({
            where: {
                Climber_ID: req.params.id
            }
        });
        res.json(climber[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createClimber = async (req, res) => {
    try {
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
        await Climber.update(req.body, {
            where: {
                Climber_ID: req.params.id
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
                Climber_ID: req.params.id
            }
        });
        res.json({
            "message": "Climber Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}