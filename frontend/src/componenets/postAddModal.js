import { useNavigate } from 'react-router-dom'
import apiUrl from "../common/apiUrl"

const PostAddModal = () => {
    const navigate = useNavigate()

    let nowTime = ""
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const today = new Date();
    let day = days[today.getDay()];
    const hour = today.getHours()
    const minute = today.getMinutes()
    if (minute < 10){
        nowTime = `${day} ${hour}:0${minute}`
    } else {
        nowTime = `${day} ${hour}:${minute}`
    }
    
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
            <div className="modal fade" id="postAddModal" tabIndex="-1" aria-labelledby="postAddModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="postAddModalLabel">Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="post-div mb-2">
                                <img className="profile-img-post me-3" src={apiUrl + "/" + User.profileImage.path} />
                                <div>
                                    <p style={{ marginBottom: "0" }}>
                                        {User.name}
                                    </p>
                                    <p style={{ fontSize: "0.8em", marginBottom: "0" }} className="text-white-50">
                                        {User.profession}
                                    </p>
                                    <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                                        {nowTime}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <textarea
                                className="form-control"
                                placeholder="Ne hakkında konuşmak istiyorsunuz?"
                                rows="5">
                            </textarea>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info rounded-5" >
                                <i className="fa-regular fa-paper-plane me-2"></i>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostAddModal;