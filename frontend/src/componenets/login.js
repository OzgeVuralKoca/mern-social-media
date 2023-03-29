import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CallToast from "../common/toast"

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        if (userName.length >= 3 && password.length >= 1) {
            navigate("/")
            CallToast("success", "Registration successful!")
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
                <div className="loginCard bg-dark p-5 rounded-4">
                    <h3 className="text-white text-center mb-3">social <span className="text-info h3">me</span>dia</h3>
                    <hr className="text-white" />
                    {/* Login Form */}
                    <form onSubmit={login} >
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <input
                                onKeyUp={checkValidation}
                                type="text"
                                className="form-control bg-dark-subtle"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                required
                                minLength="3"
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-dark-subtle" id="basic-addon1">
                                <i className="fa-solid fa-unlock"></i>
                            </span>
                            <input
                                onKeyUp={checkValidation}
                                type="password"
                                className="form-control bg-dark-subtle"
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                required
                                minLength="1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-outline-light w-100">Login</button>
                    </form>
                    <hr className="text-white" />
                    <div className="text-white">
                        Don't have an account
                        <Link to="/register" className="text-info" style={{ textDecoration: "none", float: "right" }}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login