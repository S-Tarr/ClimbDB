import React from 'react';
import { Link } from 'react-router-dom';

function Default() {
	return (
		<>
			<h1>
				Default Page
			</h1>
			<Link to="/climber">Climber Page</Link>
		</>
	);
}

export default Default;