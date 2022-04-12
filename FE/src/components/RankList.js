import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const RankList = () => {
	const [ranks, setRank] = useState([]);
 
	useEffect(() => {
		getRanks();
		console.log(ranks)
	}, []);
 
	const getRanks = async () => {
		const response = await axios.get(`http://localhost:4000/ranks`);
		setRank(response.data);
    }
   
	
    
    
	return (
		<div>
			
			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>Rank</th>
                        
						<th>ClimberID</th>
						<th># Points</th>
						
						
					</tr>
				</thead>
				<tbody>
					{ ranks.map((rank, index) => (
						<tr key={ rank.id }>
							<td>{ index + 1 }</td>
                           
                            
                            
							<td>{ rank.ClimberID }</td>
							<td>{ rank.Points }</td>
							
							
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default RankList