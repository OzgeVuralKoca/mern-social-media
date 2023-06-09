import ApiUrl from '../common/ApiUrl'
import { Link } from 'react-router-dom'

const ProfileCard = ({ User }) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="text-white bg-dark rounded-3 pb-2 px-4">
                <div className='text-center'>
                    <Link to="/profile">
                        <img
                            alt='...'
                            className="profile-img my-4"
                            src={ApiUrl + "/" + User.profileImage.path} />
                    </Link>
                    <h5 className="text-warning">{User.name}</h5>
                    <p style={{ margin: "0" }} className="text-white">{User.profession}</p>
                </div>
                <hr />
                <div className='mb-3'>
                    <p style={{ margin: "0" }} className="text-white-50">
                        <i className="fa-solid fa-briefcase me-2"></i>
                        {User.workPlace}
                    </p>
                    <p style={{ margin: "0" }} className="text-white-50">
                        <i className="fa-solid fa-location-dot me-2"></i>
                        {User.location}
                    </p>
                    <a
                        href={User.webPage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white-50">
                        <i style={{ fontSize: "0.6em" }} className="fa-solid fa-link me-2"></i>
                        {User.webPage}
                    </a>
                </div>
                <div className="text-white bg-dark rounded-3 mt-3">
                    <hr />
                    <h5 className="text-warning">About Me</h5>
                    <p>{User.about}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard