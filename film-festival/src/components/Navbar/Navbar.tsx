import {AuthBar} from "./AuthBar";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary justify-content-between">
            <div className="ms-2">
                <a className="navbar-brand" href="src/components/Navbar/Navbar#">Nimbd</a>
            </div>
            <div className="col-6">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search Films"
                           aria-label="Search Films"/>
                    <button className="btn btn-secondary" type="submit">Search</button>
                </form>
            </div>
            <AuthBar/>
        </nav>
    )
}

export default Navbar;