import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiUrl from "../common/ApiUrl"
import request from '../common/HttpService'
import CallToast from '../common/toast'
import "./style.css"
import nowTime from '../common/NowTime'

const PostAddModal = ({ getPost }) => {
    const navigate = useNavigate()
    const [content, setContent] = useState("")
    const [file, setFile] = useState();
    const [type, setType] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    

    const fileInput = useRef(null);

    // dosyayı yükleme ve önizleme
    const setFileAndType = (e, type) => {
        // Dosya yükleme işlemi sırasında önceki önizlemeyi sıfırlayın
        setPreviewUrl(null);

        // Dosya yükleme işlemi için dosya ve dosya türü bilgilerini ayarlayın
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setType(type);

        // Dosya yüklemesi tamamlandıktan sonra önizleme URL'sini oluşturun
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };

        if (selectedFile) {
            if (selectedFile.type.startsWith("image")) {
                reader.readAsDataURL(selectedFile);
            } else if (selectedFile.type.startsWith("video")) {
                reader.readAsArrayBuffer(selectedFile);
            }
        }
    };

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }

        return JSON.parse(userString);
    }
    
    const User = getUser()

    const sendPost = () => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("fileType", type);
        formData.append("userId", getUser()._id);
        if (file != null) {
            formData.append("file", file, file.name)
        }

        request(ApiUrl + "/post/add", formData, "post", (res) => {
            CallToast("success", res.data.message)
            setContent("")
            setFile(null);
            setType(null);
            setPreviewUrl(null);
            let closeBtn = document.getElementById("postAddModalCloseBtn")
            closeBtn.click()
            getPost()
        })
    }

    return (
        <>
            <div className="modal fade" id="postAddModal" tabIndex="-1" aria-labelledby="postAddModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg rounded-3">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="postAddModalLabel">Post</h1>
                            <button type="button" id="postAddModalCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="post-div mb-2">
                                <img className="profile-img-post me-3" src={ApiUrl + "/" + User.profileImage.path} />
                                <div>
                                    <p style={{ marginBottom: "0" }}>
                                        {User.name}
                                    </p>
                                    <p style={{ fontSize: "0.8em", marginBottom: "0" }} className="text-white-50">
                                        {User.profession}
                                    </p>
                                    <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                                        {nowTime()}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <textarea
                                className="form-control bg-dark text-white"
                                placeholder="What do you want to talk about?"
                                rows="5"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}>
                            </textarea>
                            {previewUrl && (
                                <div>
                                    {type === "image" ? (
                                        <img src={previewUrl} alt="File preview" style={{ maxWidth: '100%' }} />
                                    ) : (
                                        <video width="100%" controls>
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            )}


                            <div className="form-group mt-2">
                                <span className='text-info me-3'>Add for post:</span>
                                <label className="fileLabel mx-1" htmlFor="image" style={{cursor: "pointer"}}>
                                    <i className="fa fa-image bg-info text-muted px-2 py-1 rounded"></i>
                                </label>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    id="image"
                                    name="image"
                                    style={{ display: "none" }}
                                    className="mt-1"
                                    onChange={(e) => setFileAndType(e, "image")} />
                                <label className="fileLabel" htmlFor="video" style={{cursor: "pointer"}}>
                                    <i className="fa fa-play bg-info text-muted px-2 py-1 rounded mx-3 "></i>
                                </label>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    id="video"
                                    name="video"
                                    style={{ display: "none" }}
                                    className="mt-1"
                                    onChange={(e) => setFileAndType(e, "video")} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-info rounded-5"
                                onClick={sendPost}>
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