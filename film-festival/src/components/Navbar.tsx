const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary justify-content-between">
            <div className="ms-2">
                <a className="navbar-brand" href="#">Nimbd</a>
            </div>
            <div className="col-6">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-secondary" type="submit">Search</button>
                </form>
            </div>
            <div className="me-2">
                <button className="btn btn-secondary">Sign in</button>
            </div>
        </nav>
    )
}

export default Navbar;