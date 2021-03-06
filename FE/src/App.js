import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClimberList from "./components/ClimberList";
import AddClimber from "./components/AddClimber";
import EditClimber from "./components/EditClimber";
import MainPage from "./components/MainPage.js";
import NavBar from "./components/NavBar.js";
import EventList from "./components/WCCList";
import RankList from "./components/RankList";
import LoginPage from "./components/LoginPage";
import useToken from "./token.js";
import ResultsList from "./components/ResultsList";
import WR from "./components/WR";
export const UserContext = React.createContext();

function App() {
  const {token, valid, username, setToken} = useToken();
  const ctx = {token, valid, username, setToken};
  return (
    <UserContext.Provider value={ctx}>
      <Router>
        <NavBar />
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <Routes>
              <Route path="/" element={<MainPage />}/>
                <Route exact path="/climbers" element={<ClimberList />}/>
                <Route path="/climbers/add" element={<AddClimber />}/>
                <Route path="/climbers/edit/:id" element={<EditClimber />}/>
                <Route path="/events" element={<EventList />}/>
                <Route path="/ranks" element={<RankList />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/results" element={<ResultsList />}/>
                <Route path="/wr" element={<WR />}/>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
 
export default App;
