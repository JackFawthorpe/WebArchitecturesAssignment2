import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
    return (
        <body className="vh-100 bg-dark">
        <Navbar/>
        <Outlet/>
        </body>
    )
}

export default Layout;