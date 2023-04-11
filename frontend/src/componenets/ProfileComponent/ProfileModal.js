import { useEffect, useState } from 'react';
import ApiUrl from '../common/ApiUrl';
import request from '../common/HttpService';
import CallToast from '../common/toast';
import { useNavigate } from 'react-router-dom';

const ProfileModal = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [location, setLocation] = useState("");
    const [about, setAbout] = useState("");
    const [webPage, setWebPage] = useState("");
    const [workPlace, setWorkPlace] = useState("")

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }
        return JSON.parse(userString);
    }
    const user = getUser()

    useEffect(() => {
        setName(user.name);
        setProfession(user.profession);
        setLocation(user.location);
        setAbout(user.about);
        setWebPage(user.webPage)
        setWorkPlace(user.workPlace)
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const model = {
            _id: user._id,
            name: name,
            profession: profession,
            location: location,
            about: about,
            workPlace: workPlace,
            webPage: webPage
        }
        request(ApiUrl + "/updateUser", model, "post", async (res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            const closeBtn = document.getElementById("ProfileModalCloseBtn")
            closeBtn.click()
            navigate("/Profile")
            CallToast("info", "Profile is updated.")
        })
    };

    return (
        <>
            <div className="modal fade" id="ProfileModal" tabIndex="-1" aria-labelledby="ProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg rounded-3">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="ProfileModalLabel">Edit Profile</h1>
                            <button type="button" id="ProfileModalCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3" onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label className='mb-2 text-white-50'>Name Surname*</label>
                                    <input
                                        type="text"
                                        placeholder="Name Surname"
                                        className="form-control bg-dark text-white border"
                                        name='name'
                                        required
                                        minLength="3"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='mb-2 text-white-50'>Profession*</label>
                                    <input
                                        placeholder="Profession"
                                        name='profession'
                                        type="text"
                                        className="form-control bg-dark text-white border"
                                        required
                                        minLength="3"
                                        value={profession}
                                        onChange={(event) => setProfession(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='mb-2 text-white-50'>Workplace</label>
                                    <input
                                        placeholder="Workplace"
                                        name='workPlace'
                                        type="text"
                                        className="form-control bg-dark text-white border"
                                        value={workPlace}
                                        onChange={(event) => setWorkPlace(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='mb-2 text-white-50'>Location</label>
                                    <input
                                        placeholder="Location"
                                        name='location'
                                        type="text"
                                        className="form-control bg-dark text-white border"
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='mb-2 text-white-50'>Website</label>
                                    <input
                                        placeholder="Website"
                                        name='webPage'
                                        type="text"
                                        className="form-control bg-dark text-white border"
                                        value={webPage}
                                        onChange={(event) => setWebPage(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='mb-2 text-white-50'>About</label>
                                    <textarea
                                        className="form-control bg-dark text-white border"
                                        rows="5"
                                        name='about'
                                        value={about}
                                        onChange={(event) => setAbout(event.target.value)}>
                                    </textarea>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-info rounded-5">
                                        <i className="fa-solid fa-share me-2"></i>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileModal;