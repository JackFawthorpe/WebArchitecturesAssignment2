import React from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Users from "./Pages/Users";

function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
        <Router>
            <div>
                <Routes>
                    <Route path="/users" element={<Users/>}/>
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
