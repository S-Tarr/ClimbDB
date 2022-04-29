import Authentication from "../models/AuthModel.js";
import "dotenv/config.js";
import jwt from "jsonwebtoken";

export const generateToken = async (req, res) => {
	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	const user = await Authentication.findAll({
		where: {UserName: req.body.username}
	});
	try {
		if(user.length == 0) { // user not found in table
			res.json({token: "nicetry"});
		} else {
			console.log(user);
			if(user[0].dataValues.Password == req.body.password) {
				const token = jwt.sign(req.body, jwtSecretKey);
				res.json({token: token});
			} else {
				res.json({token: "nicetry"});
			}
		}
	} catch (error) {
		res.json({token: error.message});
	}
}

export const validateToken = async (req, res) => {
	let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	try {
		const token = req.body.token;
		const verif = jwt.verify(token, jwtSecretKey);
		if(verif) {
			res.send(true);
		} else {
			res.send(false);
		}
	} catch(e) {
		res.send(false);
	}
}