import React from 'react'
import ApiUrl from '../../common/ApiUrl'

const ProfileCard = ({User}) => {
    return (
        <div className="col-md-4">
            <div className="text-white bg-dark text-center rounded-3 pb-2">
                <img
                    className="profile-img my-4"
                    src={ApiUrl + "/" + User.profileImage.path} />
                <h5 className="text-info">{User.name}</h5>
                <p className="text-white-50">{User.profession}</p>
            </div>
            <div className="text-white bg-dark rounded-3 pb-2 mt-4 p-4">
                <h5 className="text-info">About Me</h5>
                <hr />
                <p>Hakkımda: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    )
}

export default ProfileCard