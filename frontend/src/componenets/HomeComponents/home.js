import PostAddModal from "../PostComponents/PostAddModal"
import "../style.css"
import request from "../../common/HttpService"
import ApiUrl from "../../common/ApiUrl"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StartPost from "./StartPost"
import ProfileCard from "./ProfileCard"
import Posts from "../PostComponents/Posts"

const Home = ({val}) => {
    const [posts, setPosts] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const navigate = useNavigate()

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login");
            return null;
        }
        return JSON.parse(userString);
    };
    const User = getUser();

    const getPost = (p = 10) => {
        let model = { pageSize: p, userId: User._id }
        request(ApiUrl + "/posts", model, "post", (res) => {
            setPosts(res.data)
            console.log(res.data)
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

    

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    {/* Profil Card */}
                    <ProfileCard User={User} />
                    {/* Post Card */}
                    <div className="col-md-8 ms-auto">
                        {/* Start post */}
                        <StartPost User={User} />
                        <hr className="text-white" />
                        {/* posts */}
                        {posts.map((val, index) => {
                            return (
                                <Posts 
                                    getPost={getPost}
                                    User={User}
                                    pageSize={pageSize}
                                    index={index}
                                    val={val} />
                            )
                        })}

                    </div>
                </div>

                <PostAddModal getPost={getPost} />
            </div >
        </>
    )
}

export default Home