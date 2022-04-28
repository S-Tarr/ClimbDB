import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import classes from './RankList.module.css'
var acs = 0;

const RankList = () => {
	const [ranks, setRank] = useState([]);
	function compare1( a, b ) {
		
		if ( a.Points < b.Points ){
		  return 1;
		}
		if ( a.Points > b.Points ){
		  return -1;
		}
		return 0;
	  }
	
	  function compare2( a, b ) {
		if ( a.Points < b.Points ){
		  return -1;
		}
		if ( a.Points> b.Points ){
		  return 1;
		}
		return 0;
	  }
	
	  function myFunction(){
		  
		if(acs == 1 || acs == 0){
			acs = 2;
		} else {
			acs = 1
		}
		getRanks();
	
	  }
	useEffect(() => {
		getRanks();
		console.log(ranks)
	}, []);
 
	const getRanks = async () => {
		const response = await axios.get(`http://localhost:4000/ranks`);
		
		if(acs == 1){
			response.data.sort(compare1);
			setRank(response.data);
		} else if(acs == 2) {
			response.data.sort(compare2);
			setRank(response.data);

		} else {
			setRank(response.data);
		}
		
		
		
    }
   
	
    
    
	return (
		<div>
			
			
			<table className={classes.maintable}>
				<thead>
					<tr>
						
					<th onClick={ () => myFunction() } >Ranking</th>
						<th>Climber Name</th>
						<th onClick={ () => myFunction() }># Points</th>
						
						
					</tr>
				</thead>
				<tbody>
					{ ranks.map((rank, index) => (
						<tr key={ rank.id }>
							<td>{ acs < 2 ? index+1 : 50-index}</td>
                           
                            
                            
							<td>{ rank.name }</td>
							<td>{ rank.Points }</td>
							
							
							
						</tr>
					)) }
					 
				</tbody>
			</table>
		</div>
	)
}
 
export default RankList