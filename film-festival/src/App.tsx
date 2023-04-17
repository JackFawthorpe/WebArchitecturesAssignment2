import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./resources/scss/main.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="*" element={<Home/>}/>
                            <Route path="" element={<Home/>}/>
                        </Route>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
