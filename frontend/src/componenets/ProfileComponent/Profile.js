import { useNavigate } from "react-router-dom";
import ApiUrl from "../../common/ApiUrl";
import ProfileModal from "./ProfileModal";

const Profile = () => {
    const navigate = useNavigate()

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }
        return JSON.parse(userString);
    }
    const user = getUser()

    return (
        <>
            <div className='Container'>
                <div className="my-4">
                    <div className="col-md-8 mx-auto">
                        <div className="text-white bg-dark rounded-3 pb-2 profile-header">
                            <button
                                className="btn btn-sm text-white text-end me-3 pt-2"
                                data-bs-toggle="modal"
                                data-bs-target="#ProfileModal">
                                <i className="fa fa-edit h5"></i>
                            </button>
                            <img
                                className="profile-page-img mx-5 mt-1 mb-3"
                                src={ApiUrl + "/" + user.profileImage.path} />
                            <div className="bg-profile-info mx-5 p-3 mb-3 rounded-3">
                                <h5 className="text-warning">{user.name}</h5>
                                <p style={{margin: "0"}} className="text-white">{user.profession}</p>
                                <p style={{margin: "0"}} className="text-white">{user.workPlace}</p>
                                <p style={{margin: "0"}} className="text-white">{user.location}</p>
                                <a
                                  href={user.webPage}
                                  target="_blank"
                                  style={{margin: "0"}}
                                  className="text-info">
                                    {user.webPage}
                                </a>
                            </div>
                        </div>
                        <div className="text-white bg-dark rounded-3 pb-2 mt-4 p-4">
                            <h5 className="text-warning">About Me</h5>
                            <hr />
                            <p>{user.about}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileModal/>
        </>
    )
}

export default Profile