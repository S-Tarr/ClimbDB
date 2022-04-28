import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const ClimberList = () => {
	const [climbers, setClimber] = useState([]);
 
	useEffect(() => {
		getClimbers();
		console.log(climbers)
	}, []);
 
	const getClimbers = async () => {
		const response = await axios.get(`http://localhost:5000/climbers`);
		setClimber(response.data);
	}
 
	const deleteClimber = async (id) => {
		await axios.delete(`http://localhost:5000/climbers/${id}`);
		getClimbers();
	}
 
	return (
		<div>
			<Link to="/add" className="button is-primary mt-2">Add New</Link>
			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Weight</th>
						<th>Hometown</th>
						<th>Gender</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{ climbers.map((climber, index) => (
						<tr key={ climber.id }>
							<td>{ index + 1 }</td>
							<td>{ climber.name }</td>
							<td>{ climber.weight }</td>
							<td>{ climber.hometown }</td>
							<td>{ (climber.isMale ? "Male" : "Female") }</td>
							<td>
								<Link to={`/edit/${climber.id}`} className="button is-small is-info">Edit</Link>
								<button onClick={ () => deleteClimber(climber.id) } className="button is-small is-danger">Delete</button>
							</td>
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default ClimberList