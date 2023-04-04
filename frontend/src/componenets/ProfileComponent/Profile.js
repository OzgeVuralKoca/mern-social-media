import { useNavigate } from "react-router-dom";
import ApiUrl from "../../common/ApiUrl";

const Profile = () => {
    const navigate = useNavigate()

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }
        return JSON.parse(userString);
    }
    const User = getUser()

    return (
        <>
            <div className='Container'>
                <div className="row mt-4">
                    <div className="col-md-8 mx-auto">
                        <div className="text-white bg-dark rounded-3 pb-2 profile-header">
                            <img
                                className="profile-page-img mx-5 my-4"
                                src={ApiUrl + "/" + User.profileImage.path} />
                            <div className="bg-profile-info mx-5 p-3 mb-3 rounded-3">
                                <h5 className="text-warning">{User.name}</h5>
                                <p className="text-white">{User.profession}</p>
                            </div>
                        </div>
                        <div className="text-white bg-dark rounded-3 pb-2 mt-4 p-4">
                            <h5 className="text-warning">About Me</h5>
                            <hr />
                            <p>Hakkımda: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile