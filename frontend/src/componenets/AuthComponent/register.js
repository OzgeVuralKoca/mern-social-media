import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CallToast from "../common/toast"
import ApiUrl from "../common/ApiUrl"
import request from "../common/HttpService"

const Register = () => {
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setprofileImage] = useState();
    const [profession, setProfession] = useState("");
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("name", name)
        formData.append("userName", userName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("profession", profession)
        formData.append("image", profileImage)
        request(`${ApiUrl}/register`, formData, "post", (res) => {
            localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                CallToast("success", "Registration successful!")
                navigate("/home");
        })
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
                                    <i className="fa-solid fa-envelope"></i>
                                </span>
                                <input
                                    onKeyUp={checkValidation}
                                    placeholder="email"
                                    type="email"
                                    className="form-control bg-dark-subtle"
                                    required
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    minLength="3"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
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
                                    onChange={(e) => setprofileImage(e.target.files[0])} />
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
                        <Link to="/" className="text-info" style={{ textDecoration: "none", float: "right" }}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;