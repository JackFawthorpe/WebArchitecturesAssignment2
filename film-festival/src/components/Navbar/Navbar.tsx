import {RightNav} from "./RightNav";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-primary justify-content-between">
            <ul className='navbar-nav mr-auto'>
                <a className="ms-2 navbar-brand" href="/films">Nimdb</a>
            </ul>
            <RightNav/>
        </nav>
    )
}

export default Navbar;