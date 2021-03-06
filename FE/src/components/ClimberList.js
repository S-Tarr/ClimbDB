import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import { useContext } from 'react';
import LoginPage from './LoginPage';
import "./ClimberList.css"
 
const ClimberList = () => {
	const userInfo = useContext(UserContext);
	const [climbers, setClimber] = useState([]);
 
	useEffect(() => {
		getClimbers();
		console.log(climbers)
	}, []);
 
	const getClimbers = async () => {
		const response = await axios.get(`http://localhost:4000/climbers`);
		setClimber(response.data);
	}
 
	const deleteClimber = async (id) => {
		await axios.delete(`http://localhost:4000/climbers/${id}`);
		getClimbers();
	}
 
	return (
		<div>
			{userInfo.valid ? <Link to="/climbers/add" className="button is-primary mt-2">Add New</Link> : null}
			<table className="table">
				<thead>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th>Hometown</th>
						{userInfo.valid ? <th>Actions</th> : null}
					</tr>
				</thead>
				<tbody>
					{ climbers.map((climber, index) => (
						<tr key={climber.id}>
							<td>{climber.id}</td>
							<td>{climber.name}</td>
							<td>{climber.hometown}</td>
							{userInfo.valid ? <td>
								<Link to={`/climbers/edit/${climber.id}`} className="button is-small is-info">Edit</Link>
								<button onClick={() => deleteClimber(climber.id)} className="button is-small is-danger">Delete</button>
							</td> : null}
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default ClimberList;