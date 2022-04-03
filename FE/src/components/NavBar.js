import React from 'react';
import {  Link } from "react-router-dom";

import classes from './NavBar.module.css'
const NavBar= () =>{
  return (
    <header>
    <div className={classes.title}>
        <a>Climber DB</a>
    </div>
<div className={classes.mid}>
    <ul className = {classes.nav}>
         <li>
            <Link to="/#">Climbers</Link>
        </li>
        <li>
            <Link to="/events">Events</Link>
        </li>
        <li>
            <Link to="/wr">World Records</Link>
        </li>
        
    </ul>

</div>

<div className={classes.right}>
    <a><Link to="user">USERNAME</Link></a>
    </div>


</header>
  );
}
export default NavBar;
