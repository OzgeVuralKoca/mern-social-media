import profileImg from "../images/profileImg.jpg"
import PostAddModal from "./postAddModal"
import "./style.css"
import request from "../common/httpService"
import apiUrl from "../common/apiUrl"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()

    let nowTime = ""
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    let day = days[today.getDay()];
    const hour = today.getHours()
    const minute = today.getMinutes()
    if (minute < 10) {
        nowTime = `${day} ${hour}:0${minute}`
    } else {
        nowTime = `${day} ${hour}:${minute}`
    }

    const getPost = (p = 10) => {
        let model = { pageSize: p, userId: User._id }
        request(apiUrl + "/posts", model, "post", (res) => {
            setPosts(res.data)
        })
    }

    useEffect(() => {
        getPost()
    }, [])

    const handleScroll = () => {
        const windowHeight = window.innerHeight
        const documenHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        if (Math.ceil(windowHeight + scrollTop) >= documenHeight) {
            setPageSize(val => val + 10)
            getPost(pageSize + 10)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const showComment = (index) => {
        let element = document.getElementById("div-" + index);
        element.style = "";
    }

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }

        return JSON.parse(userString);
    }

    const User = getUser()

    const likeOrUnlike = (postId) => {
        let model = { userId: User._id, postId: postId }
        request(apiUrl + "/likeOrUnlike", model, "post", () => {
            getPost(pageSize)
        })
    }

    return (
        <div className="container">
            <div className="row mt-4">
                {/* Post Card */}
                <div className="col-md-8 ms-auto">
                    {/* Start post */}
                    <div className="text-white bg-dark rounded-3 p-4 post-shadow">
                        <div className="post-div">
                            <img className="profile-img-post me-3" src={apiUrl + "/" + User.profileImage.path} />
                            <button className="post-button btn btn-secondary rounded-5 text-start ps-3"
                                data-bs-toggle="modal"
                                data-bs-target="#postAddModal">
                                Start a post
                            </button>
                        </div>
                    </div>
                    <hr className="text-white" />
                    {/* posts */}
                    {posts.map((val, index) => {
                        return (
                            <div key={index}>
                                <div className="text-white bg-dark rounded-3 p-4 my-3 post-shadow">
                                    <div className="post-div mb-2">
                                        <img className="profile-img-post me-3" src={apiUrl + "/" + val.users[0].profileImage.path} />
                                        <div>
                                            <p style={{ marginBottom: "0" }}>
                                                {val.users[0].name}
                                            </p>
                                            <p style={{ fontSize: "0.8em", marginBottom: "0" }} className="text-white-50">
                                                {val.users[0].profession}
                                            </p>
                                            <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                                                {nowTime}
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        {val.content}
                                    </p>
                                    <hr />
                                    {
                                        val.likes.length > 0 ?
                                            <>
                                                <p>
                                                    <i className="fa-solid fa-thumbs-up me-2 text-success"></i>
                                                    {val.likes.length}
                                                </p>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                    <button
                                        onClick={() => likeOrUnlike(val._id)}
                                        className={
                                            `btn btn-dark me-2 p-2 rounded-3
                                            ${val.likes.filter(p => p.userId === getUser()._id).length > 0 ? 'text-success bg-success-subtle' : ''}`
                                        }
                                    >
                                        <i className="fa-solid fa-thumbs-up me-2"> </i>
                                        Like
                                    </button>
                                    <button
                                        onClick={() => showComment(index)}
                                        className="btn btn-dark text-white-50 p-2">
                                        <i className="fa-regular fa-comment me-2"></i>
                                        Comment
                                    </button>
                                    <div
                                        className="mt-4"
                                        style={{ display: "none" }}
                                        id={'div-' + index}>
                                        <div className="input-group mb-4 rounded-5">
                                            <input type="text" className="form-control bg-secondary text-white py-2 rounded-start-5" placeholder="Add a comment..." />
                                            <button className="btn btn-info rounded-end-5" type="button" id="button-addon2">Send</button>
                                        </div>
                                        <div className="comment">
                                            <div>
                                                <img className="profile-img-comment" src={profileImg} />
                                            </div>
                                            <span className="ms-2">
                                                Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örnekleri
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
                {/* Profil Card */}
                <div className="col-md-4">
                    <div className="text-white bg-dark text-center rounded-3 pb-2">
                        <img
                            className="profile-img my-4"
                            src={apiUrl + "/" + User.profileImage.path} />
                        <h5 className="text-info">{User.name}</h5>
                        <p className="text-white-50">{User.profession}</p>
                    </div>
                    <div className="text-white bg-dark rounded-3 pb-2 mt-4 p-4">
                        <h5 className="text-info">About Me</h5>
                        <hr />
                        <p>Hakkımda: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>

            <PostAddModal getPost={getPost} />
        </div>
    )
}

export default Home