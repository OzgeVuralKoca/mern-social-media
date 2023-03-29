import profileImg from "../images/profileImg.jpg"

const PostAddModal = () => {
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
                            <img className="profile-img-post me-3" src={profileImg} />
                            <div>
                                <p style={{ marginBottom: "0" }}>
                                    Özge Vural Koca
                                </p>
                                <p style={{ fontSize: "0.8em", marginBottom: "0" }} className="text-white-50">
                                    Frontend Developer
                                </p>
                                <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                                    26.03.2023 02:00
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