import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import classes from './RankList.module.css'
var acs = 0;
var year = 2021;
const RankList = () => {
	const [ranks, setRank] = useState([]);
	function compare1( a, b ) {
		
		if ( a.Points < b.Points ){
		  return 1;
		}
		if ( a.Points > b.Points ){
		  return -1;
		}
		return 1;
	  }
	
	  function compare2( a, b ) {
		if ( a.Points < b.Points ){
		  return -1;
		}
		if ( a.Points> b.Points ){
		  return 1;
		}
		return 1;
	  }
	
	function myFunction(pyear){
		if(pyear != year){
			acs = 2
		}
		if(acs == 1 || acs == 0){
			acs = 2;
		} else {
			acs = 1
		}
		getRanks(pyear);
	
	}
	useEffect(() => {
		getRanks(2021);
		console.log(ranks)
	}, []);
 
	const getRanks = async (SYear) => {
		year = SYear
		
		const response = await axios.get(`http://localhost:4000/ranks/${SYear}`);
		
		if(acs == 1){
			response.data.sort(compare1);
			setRank(response.data);
			
		} else if(acs == 2) {
			response.data.sort(compare2);
			setRank(response.data);
			

		} else {
			setRank(response.data);

		}
		console.log(response.data)
		
		
		
    }
   
	
    // getRanks();
    
	return (

		<div>
			
			<button onClick={ () => myFunction(2017)}>2017</button>
			<button onClick={ () => myFunction(2018)}>2018</button>
			<button onClick={ () => myFunction(2019)}>2019</button>
			<button onClick={ () => myFunction(2021)}>2021</button>
			
			<table className={classes.maintable}>
				<thead>
					<tr>
						
					<th onClick={ () => myFunction(year) } >Ranking</th>
						<th>Climber Name</th>
						<th onClick={ () => myFunction(year) }># Points</th>
						
						
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