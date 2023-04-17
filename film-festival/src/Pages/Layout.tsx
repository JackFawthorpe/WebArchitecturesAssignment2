import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <body>
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Navbar</span>
            </div>
        </nav>
        <Outlet/>
        </body>
    )
}

export default Layout;