import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./resources/scss/main.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Layout from "./Pages/Layout";
import FilmsPage from "./Pages/FilmsPage";
import FilmDetailsPage from "./Pages/FilmDetailsPage";
import ProfilePage from "./Pages/ProfilePage";

// @ts-ignore
import defaultImage from "./resources/defaultUser.png";

function App() {

    const replaceImage = (error: any) => {
        error.target.src = defaultImage;
    }

    return (
        <div className="App">
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/film/:id" element={<FilmDetailsPage/>}/>
                            <Route path="/" element={<FilmsPage/>}/>
                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="*" element={<FilmsPage/>}/>
                        </Route>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
