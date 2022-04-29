import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const ResultsList = () => {
	const [results, setResults] = useState([]);
 
	useEffect(() => {
		getAllResults();
		console.log(results)
	}, []);
 
	const getAllResults = async () => {
		const response = await axios.get(`http://localhost:4000/results`);
		setResults(response.data);
	}
 

 
	return (
		<div>
			
			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>Instance</th>
						<th>Event Location</th>
						<th>Climber ID</th>
						<th>Ranking</th>
                        <th>Qualification</th>
						<th>Semi-Final</th>
						<th>Final</th>
                        <th>Event Type</th>
						
					</tr>
				</thead>
				<tbody>
					{ results.map((result, index) => (
						<tr key={ result.id }>
							<td>{ index + 1 }</td>
							<td>{ result.WCC_ID}</td>
							<td>{ result.Climber_ID  }</td>
							<td>{ result.ClimberRank }</td>
                            <td>{ result.Qualification}</td>
							<td>{ result.SemiFinal  }</td>
							<td>{ result.Final }</td>
                            <td>{ result.EventType }</td>
                            
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default ResultsList