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
			res.json({
				token: "nicetry",
				username: ""
			});
		} else {
			if(user[0].dataValues.Password == req.body.password) {
				const token = jwt.sign(req.body, jwtSecretKey);
				res.json({
					token: token,
					username: req.body.username
				});
			} else {
				res.json({
					token: "nicetry",
					username: ""
				});
			}
		}
	} catch (error) {
		res.json({
			token: error.message,
			username: ""
		});
	}
}

export const validateToken = async (req, res) => {
	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	try {
		const token = req.body.token;
		const verif = jwt.verify(token, jwtSecretKey);
		if(verif) {
			res.json({
				username: req.body.username,
				valid: true
			});
		} else {
			res.json({
				username: "",
				valid: false
			});
		}
	} catch(e) {
		res.json({
			username: "",
			valid: false
		});
	}
}