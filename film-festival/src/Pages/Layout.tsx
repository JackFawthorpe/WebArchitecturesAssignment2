import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
    return (
        <div className="vh-100 bg-success">
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout;