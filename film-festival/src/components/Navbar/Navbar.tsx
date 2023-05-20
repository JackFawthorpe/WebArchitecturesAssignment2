import {RightNav} from "./RightNav";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-primary justify-content-between">
            <ul className='navbar-nav mr-auto'>
                <h2 className="ms-2 navbar-brand">Nimdb</h2>
            </ul>
            <RightNav/>
        </nav>
    )
}

export default Navbar;