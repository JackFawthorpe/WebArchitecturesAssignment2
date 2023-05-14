import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
    return (
        <div className="vh-100 bg-secondary">
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout;