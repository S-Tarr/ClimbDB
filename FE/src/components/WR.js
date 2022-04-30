import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import classes from './RankList.module.css'
var acs = 0;

const WRList = () => {
	const [wr, setWR] = useState([]);
	
	
	 
	
	 
	useEffect(() => {
		getWR();
		console.log(wr)
	}, []);
 
	const getWR = async () => {
		const response = await axios.get(`http://localhost:4000/wr`);
		
		
		setWR(response.data);

    }
   
	
    
    
	return (
		<div>
			
			<center>WORLD RECORDS </center>
			<table className={classes.maintable}>
				<thead>
					<tr>
						
					
						<th>Climber Name</th>
                        <th>Time (secs)</th>
						<th> DATE </th>
						
						
					</tr>
				</thead>
				<tbody>
					{ wr.map((w, index) => (
						<tr key={ w.id }>
							
                           
                            
                            
							<td>{ w.name }</td>
                            <td>{ w.Final }</td>
                            <td>{ w.eventTime.split(" ")[0] }</td>
							
							
							
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default WRList