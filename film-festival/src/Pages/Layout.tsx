import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
    return (
        <body>
        <Navbar/>
        <Outlet/>
        </body>
    )
}

export default Layout;