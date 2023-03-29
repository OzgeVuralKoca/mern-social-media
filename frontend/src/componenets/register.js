import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CallToast from "../common/toast"

const Register = () => {
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState();
    const [profession, setProfession] = useState("");
    const navigate = useNavigate();

    const register = (e) => {
        if (
            userName.length >= 3 &&
            password.length >= 1 &&
            name.length >= 3 &&
            image != undefined) {
            CallToast("success", "Login successful!")
            navigate("/");
        }
    }

    const checkValidation = (e) => {
        if (e.target.validity.valid) {
            e.target.className = "form-control is-valid"
        } else {
            e.target.className = "form-control is-invalid"
        }
    }

    return (
        <div className="loginBg">
        <div className="loginBgImg d-flex justify-content-center">
            <div className="loginCard bg-dark p-5 rounded-4 col-md-6">
                <h3 className="text-white text-center mb-3">social <span className="text-info h3">me</span>dia</h3>
                <hr className="text-white" />
                {/* Register Form */}
                <form className="row g-3" onSubmit={register}>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-font"></i>
                            </span>
                            <input
                                aria-describedby="basic-addon1"
                                type="text"
                                placeholder="Name Surname"
                                onKeyUp={checkValidation}
                                className="form-control bg-dark-subtle"
                                required
                                minLength="3"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <input
                                onKeyUp={checkValidation}
                                placeholder="User Name"
                                type="text"
                                className="form-control bg-dark-subtle"
                                required
                                aria-label="userName"
                                aria-describedby="basic-addon1"
                                minLength="3"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-briefcase"></i>
                            </span>
                            <input
                                aria-describedby="basic-addon1"
                                placeholder="Profession"
                                type="text"
                                onKeyUp={checkValidation}
                                className="form-control bg-dark-subtle"
                                required
                                minLength="3"
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-camera-retro"></i>
                            </span>
                            <input
                                aria-describedby="basic-addon1"
                                placeholder="Profil Image"
                                type="file"
                                className="form-control bg-dark-subtle"
                                required
                                onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-unlock"></i>
                            </span>
                            <input
                                aria-describedby="basic-addon1"
                                placeholder="password"
                                onKeyUp={checkValidation}
                                className="form-control bg-dark-subtle"
                                type="password"
                                required
                                minLength="1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-outline-light w-50">
                        Kayıt Ol
                    </button>
                    </div>
                </form>
                <hr className="text-white" />
                <div className="text-white">
                    Do have an account?
                    <Link to="/login" className="text-info" style={{ textDecoration: "none", float: "right" }}>Login</Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Register;