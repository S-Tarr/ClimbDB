import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Climber from './Climber.js';
import Default from './Default.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}/>
        <Route path="/climber" element={<Climber />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
