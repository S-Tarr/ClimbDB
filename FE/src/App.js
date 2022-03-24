// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Climber from './Climber.js';
// import Default from './Default.js';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Default />}/>
//         <Route path="/climber" element={<Climber />}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClimberList from "./components/ClimberList";
import AddClimber from "./components/AddClimber";
import EditClimber from "./components/EditClimber";
 
function App() {
  return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route exact path="/" element={<ClimberList />}/>
            <Route path="/add" element={<AddClimber />}/>
            <Route path="/edit/:id" element={<EditClimber />}/>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}
 
export default App;
