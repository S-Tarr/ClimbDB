import React, { useState, useEffect } from 'react';

const LoginPage = () => {
	return(
		<div>
			<h1>Enter Login Information</h1>
			<form>
				<div>
					<label>Username</label>
					<input
						type="text"
						placeholder="Username"
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
					/>
				</div>
				<button className="button is-primary">Login</button>
			</form>
		</div>
	);
}

export default LoginPage;