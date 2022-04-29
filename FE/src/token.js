import { useEffect, useState } from "react";
import axios from 'axios';

const useToken = () => {
	const getToken = () => {
		const tokenString = sessionStorage.getItem("token");
		try {
			if(!tokenString) return "";
			return tokenString;
		} catch (e) {
			return "nottesttoken";
		}
	};

	const getUsername = () => {
		const usernameString = sessionStorage.getItem("username");
		try {
			if(!usernameString) return "";
			return usernameString;
		} catch (e) {
			return "";
		}
	}
	
	// tkn is a string
	const getValid = async (tkn) => {
		const response = await axios.post("http://localhost:4000/auth/validate", {
			token: tkn,
			username: getUsername()
		});
		return response.data.valid;
	}

	// token is a string (not json)
	const [token, setToken] = useState(getToken());
	const [username, setUsername] = useState(getUsername());
	const [valid, setValid] = useState(getValid(token));

	const validate = async (tkn) => {
		const response = await axios.post("http://localhost:4000/auth/validate", {
			token: tkn
		});
		setValid(response.data.valid);
	}
	
	// tkn is json
	const saveToken = async (tkn) => {
		sessionStorage.setItem("token", tkn.token);
		sessionStorage.setItem("username", tkn.username);
		setToken(tkn.token);
		setUsername(tkn.username);
	};

	useEffect(() => {
		validate(token);
	}, [token]);

	return({
		setToken: saveToken,
		token: token,
		valid: valid,
		username: username
	});
};

export default useToken;