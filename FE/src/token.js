import { useState } from "react";

const useToken = () => {
	const getToken = () => {
		const tokenString = sessionStorage.getItem("token");
		const userToken = JSON.parse(tokenString);
		try {
			return userToken.token;
		} catch (e) {
			return "nottesttoken";
		}
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (tkn) => {
		sessionStorage.setItem("token", JSON.stringify(tkn));
		setToken(tkn.token);
	};

	return({
		setToken: saveToken,
		token: token
	});
};

export default useToken;