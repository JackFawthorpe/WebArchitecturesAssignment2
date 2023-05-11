import "../components/Films/FilmNav"
import React from "react";
import FilmNav from "../components/Films/FilmNav";

const Home = () => {


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">

                    </div>
                    <div className="col-4 p-0">
                        <FilmNav/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;