import profileImg from "../images/profileImg.jpg"
import PostAddModal from "./postAddModal"
import "./style.css"

const Home = () => {
    return (
        <div className="container">
            <div className="row mt-4">
                {/* Profil Card */}
                <div className="col-md-3">
                    <div className="text-white bg-dark text-center rounded-4 pb-2">
                        <img
                            className="profile-img my-4"
                            src={profileImg} />
                        <h5 className="text-info">Özge Vural Koca</h5>
                        <p className="text-white-50">Frontend Developer</p>
                    </div>
                    <div className="text-white bg-dark rounded-4 pb-2 mt-4 p-4">
                        <h5 className="text-info">About Me</h5>
                        <hr />
                        <p>Hakkımda: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                {/* Post Card */}
                <div className="col-md-8 ms-auto">
                    {/* Start post */}
                    <div className="text-white bg-dark rounded-4 p-4">
                        <div className="post-div">
                            <img className="profile-img-post me-3" src={profileImg} />
                            <button className="post-button btn btn-secondary rounded-5 text-start ps-3"
                                data-bs-toggle="modal"
                                data-bs-target="#postAddModal">
                                Start a post
                            </button>
                        </div>
                    </div>
                    <hr className="text-white" />
                    {/* posts */}
                    <div className="text-white bg-dark rounded-4 p-4">
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
                        <p>
                            Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır. Virginia'daki Hampden-Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örneklerini inceled
                        </p>
                        <hr />
                        <button className="btn btn-dark me-2 text-white-50 p-2">
                            <i className="fa-solid fa-thumbs-up me-2"> </i>
                            Like
                        </button>
                        <button
                            className="btn btn-dark text-white-50 p-2">
                            <i className="fa-regular fa-comment me-2"></i>
                            Comment
                        </button>
                        <div className="mt-4">
                            <div className="input-group mb-4 rounded-5">
                                <input type="text" className="form-control bg-secondary text-white py-2 rounded-start-5" placeholder="Add a comment..." />
                                <button className="btn btn-info rounded-end-5" type="button" id="button-addon2">Send</button>
                            </div>
                            <div className="comment">
                                <div>
                                    <img className="profile-img-comment" src={profileImg} />
                                </div>
                                <span className="ms-2">
                                    Sydney College'dan Latince profesörü Richard McClintock, bir Lorem Ipsum pasajında geçen ve anlaşılması en güç sözcüklerden biri olan 'consectetur' sözcüğünün klasik edebiyattaki örnekleri
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <PostAddModal />
        </div>
    )
}

export default Home