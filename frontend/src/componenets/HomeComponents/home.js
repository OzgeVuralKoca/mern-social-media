import PostAddModal from "../PostAddModal"
import "../style.css"
import request from "../../common/HttpService"
import ApiUrl from "../../common/ApiUrl"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DateFormat from "../../common/DateFormat"
import StartPost from "./StartPost"
import ProfileCard from "./ProfileCard"
import Comment from "./Comment"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()

    const getPost = (p = 10) => {
        let model = { pageSize: p, userId: User._id }
        request(ApiUrl + "/posts", model, "post", (res) => {
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
        request(ApiUrl + "/likeOrUnlike", model, "post", () => {
            getPost(pageSize)
        })
    }

    const addComment = (_id) => {
        let element = document.getElementById("commentInput-" + _id)
        let content = element.value
        let model = { postId: _id, content: content, userId: User._id }
        request(ApiUrl + "/comments/add", model, "post", (res) => {
            getPost();
        })
        element.value = ""
    }

    const deletePost = (_id) => {
        let model = { _id: _id };
        request(ApiUrl + "/post/removeById", model, "post", (res) => {
            getPost(); // props aracılığıyla getPost fonksiyonunu çağırın
        });
    };

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    {/* Post Card */}
                    <div className="col-md-8 ms-auto">
                        {/* Start post */}
                        <StartPost User={User} />
                        <hr className="text-white" />
                        {/* posts */}
                        {posts.map((val, index) => {
                            return (
                                <div key={index}>
                                    <div className="text-white bg-dark rounded-3 p-4 my-3 shadow">
                                        {User._id === val.users[0]._id && (
                                            <div class="dropdown" style={{ float: "right" }}>
                                                <button class="btn btn-sm text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa-solid fa-ellipsis h5"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end bg-dark shadow">
                                                    <li>
                                                        <button
                                                            onClick={() => deletePost(val._id)}
                                                            className="btn btn-dark rounded-0 text-white-50 p-2 w-100 text-start">
                                                            <i className="fa fa-trash me-2"></i>
                                                            Delete Post
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                        <div className="post-div mb-2">
                                            <img className="profile-img-post me-3" src={ApiUrl + "/" + val.users[0].profileImage.path} />
                                            <div style={{ float: "right" }}>
                                                <p style={{ marginBottom: "0" }}>
                                                    {val.users[0].name}
                                                </p>
                                                <p style={{ fontSize: "0.8em", marginBottom: "0" }} className="text-white-50">
                                                    {val.users[0].profession}
                                                </p>
                                                <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                                                    {DateFormat(val.createdDate)}
                                                </p>
                                            </div>
                                        </div>
                                        <p>
                                            {val.content}
                                        </p>
                                        {
                                            val.video != undefined &&
                                            <video width="100%" controls>
                                                <source src={ApiUrl + "/" + val.video.path} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        }
                                        {
                                            val.image != undefined &&
                                            <img width="100%" src={ApiUrl + "/" + val.image.path} />
                                        }
                                        <br />
                                        <hr />
                                        {val.likes.length > 0 && (
                                            <p>
                                                <i className="fa-solid fa-thumbs-up me-2 text-success"></i>
                                                {val.likes.length}
                                            </p>
                                        )}
                                        <button
                                            onClick={() => likeOrUnlike(val._id)}
                                            className={
                                                `btn btn-dark me-2 p-2 rounded-3
                                            ${val.likes.filter(p => p.userId === User._id).length > 0 ? 'text-success bg-success-subtle' : ''}`
                                            }>
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
                                                <input
                                                    type="text"
                                                    className="form-control bg-secondary text-white py-2 rounded-start-5"
                                                    placeholder="Add a comment..."
                                                    id={"commentInput-" + val._id} />
                                                <button
                                                    className="btn btn-info rounded-end-5"
                                                    type="button"
                                                    id="button-addon2"
                                                    onClick={() => addComment(val._id)}>
                                                    Send
                                                </button>
                                            </div>
                                            {val.comments.map((commentVal, commentIndex) => {
                                                return (
                                                    <Comment
                                                        DateFormat={DateFormat}
                                                        commentVal={commentVal}
                                                        val={val} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    {/* Profil Card */}
                    <ProfileCard User={User} />
                </div>

                <PostAddModal getPost={getPost} />
            </div >
        </>
    )
}

export default Home