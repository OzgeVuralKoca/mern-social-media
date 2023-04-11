import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CallToast from "../common/toast"
import request from "../common/HttpService"
import apiUrl from "../common/ApiUrl"

const Login = () => {
    const [emailOrUserName, setEmailOrUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        let model = {emailOrUserName: emailOrUserName, password: password}
        request(apiUrl + "/login", model, "post", async (res)=>{            
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            CallToast("success", "Login successful!")
            navigate("/home")
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
                                placeholder="email or username"
                                aria-label="emailOrUserName"
                                aria-describedby="basic-addon1"
                                required
                                minLength="3"
                                value={emailOrUserName}
                                onChange={(event) => setEmailOrUserName(event.target.value)} />
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