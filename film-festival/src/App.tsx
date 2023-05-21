import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./resources/scss/main.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Layout from "./Pages/Layout";
import FilmsPage from "./Pages/FilmsPage";
import FilmDetailsPage from "./Pages/FilmDetailsPage";
import ProfilePage from "./Pages/ProfilePage";

// @ts-ignore
import defaultImage from "./resources/defaultUser.png";
import FilmCreatePage from "./Pages/FilmCreatePage";
import {authStore} from "./store";
import axios from "axios";

function App() {

    const currentUser = authStore(state => state.currentUser);

    useEffect(() => {
        if (currentUser != null) {
            axios.defaults.headers.common['X-Authorization'] = currentUser.token;
        }
    }, [])

    return (
        <div className="App">
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/film/create" element={<FilmCreatePage/>}/>
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
