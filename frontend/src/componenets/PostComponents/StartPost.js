import ApiUrl from '../common/ApiUrl'

const StartPost = ({User}) => {

    return (
        <>
            <div className="text-white bg-dark rounded-3 p-4 post-shadow">
                <div className="post-div">
                    <img alt='...' className="profile-img-post me-3" src={ApiUrl + "/" + User.profileImage.path} />
                    <button className="post-button btn btn-secondary rounded-5 text-start ps-3"
                        data-bs-toggle="modal"
                        data-bs-target="#postAddModal">
                        Start a post
                    </button>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                    <button className="btn text-info rounded-3 text-start ps-3"
                        data-bs-toggle="modal"
                        data-bs-target="#postAddModal">
                        <i className="fa fa-image bg-info text-white px-3 py-1 rounded me-2"></i>
                        Add Photo
                    </button>
                    <button className="btn text-info rounded-3 text-start ps-3"
                        data-bs-toggle="modal"
                        data-bs-target="#postAddModal">
                        <i className="fa fa-play bg-info text-white px-3 py-1 rounded me-2"></i>
                        Add Video
                    </button>
                </div>
            </div>
        </>
    )
}

export default StartPost