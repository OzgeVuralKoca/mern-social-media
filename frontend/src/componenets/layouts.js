import profileImg from "../images/profileImg.jpg"
import { Outlet, Link, useNavigate } from 'react-router-dom'

const Layouts = () => {

    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid container">
                    <Link to="/" className="navbar-brand">social <span className="text-info">me</span>dia</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img className="profile-img-comment me-2" src={profileImg} />
                                    Özge
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                    </li>
                                    <li>
                                        <button onClick={logout} className="dropdown-item">Logout</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Layouts