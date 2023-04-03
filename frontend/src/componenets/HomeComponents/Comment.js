import ApiUrl from '../../common/ApiUrl'

const Comment = ({DateFormat, commentVal, val}) => {
    return (
        <div className="comment my-2">
            <div className="post-div">
                <img
                    className="profile-img-comment me-3"
                    src={ApiUrl + "/" + commentVal.user.profileImage.path}
                />
                <div className="comment-div px-3 pt-2 rounded-4">
                    <p style={{ marginBottom: "0" }}>
                        {commentVal.user.name}
                    </p>
                    <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                        {DateFormat(val.createdDate)}
                    </p>
                    <p className="ms-2">
                        {commentVal.content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment