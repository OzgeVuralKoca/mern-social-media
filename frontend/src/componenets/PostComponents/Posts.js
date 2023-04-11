import React from 'react'
import ApiUrl from '../common/ApiUrl';
import request from '../common/HttpService';
import Comment from '../HomeComponents/Comment';
import DateFormat from '../common/DateFormat';
import { useNavigate } from 'react-router-dom';

const Posts = ({User, getPost, pageSize, index, val}) => {
    const navigate = useNavigate()

    const showComment = (index) => {
        let element = document.getElementById("div-" + index);
        element.style = "";
    }

    const likeOrUnlike = (postId) => {
        let model = { userId: User._id, postId: postId, userName: User.userName }
        request(ApiUrl + "/likeOrUnlike", model, "post", () => {
            getPost(pageSize)
        })
    }

    const addComment = (_id) => {
        let element = document.getElementById("commentInput-" + _id)
        let content = element.value
        let model = { postId: _id, content: content, userId: User._id }
        request(ApiUrl + "/comments/add", model, "post", (res) => {
            getPost();
            console.log(getPost())
        })
        element.value = ""
    }

    const deletePost = (_id) => {
        let model = { _id: _id };
        request(ApiUrl + "/post/removeById", model, "post", (res) => {
            getPost(); // props aracılığıyla getPost fonksiyonunu çağırın
        });
    };
    return (
        <>
            <div key={index}>
                <div className="text-white bg-dark rounded-3 p-4 my-3 shadow">
                    {User._id === val.users[0]._id && (
                        <div className="dropdown" style={{ float: "right" }}>
                            <button className="btn btn-sm text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-ellipsis h5"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end bg-dark shadow">
                                <li>
                                    <button
                                        onClick={() => deletePost(val._id)}
                                        className="btn btn-dark rounded-0 text-white-50 p-2 w-100 text-start">
                                        <i className="fa fa-trash me-2"></i>
                                        Delete Post
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="post-div mb-2">
                        <img 
                            className="profile-img-post me-3" style={{cursor: "pointer"}}
                            src={ApiUrl + "/" + val.users[0].profileImage.path} 
                            onClick={() => navigate('/profiles/' + val.users[0]._id)} />
                        <div style={{ float: "right" }}>
                            <p style={{ marginBottom: "0" }}>
                                {val.users[0].name}
                            </p>
                            <p style={{ fontSize: "0.8em", marginBottom: "0" }} className="text-white-50">
                                {val.users[0].profession}
                            </p>
                            <p className="text-white-50" style={{ fontWeight: "300", fontSize: "0.8em", marginBottom: "0" }}>
                                {DateFormat(val.createdDate)}
                            </p>
                        </div>
                    </div>
                    <p>
                        {val.content}
                    </p>
                    {
                        val.video != undefined &&
                        <video width="100%" controls>
                            <source src={ApiUrl + "/" + val.video.path} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    }
                    {
                        val.image != undefined &&
                        <img width="100%" src={ApiUrl + "/" + val.image.path} />
                    }
                    <br /><br />
                    {val.likes.length > 0 && (
                        <p className='text-white-50' style={{float: "left", fontSize: "0.8em"}}>
                            <i className="fa-solid fa-thumbs-up me-2 text-success" ></i>
                            {val.likes[0].userName}
                            <span className='text-white-50'> {val.likes.length > 1 ? `and ${val.likes.length - 1} other` : ""}</span>
                        </p>
                    )}
                    {val.comments.length > 0 && (
                        <p className='text-white-50' style={{float: "right", fontSize: "0.8em"}}>
                            {val.comments.length}
                            <i className="fa-regular fa-comment ms-2"></i>
                            
                        </p>
                    )}
                    <br />
                    <hr />
                    <button
                        onClick={() => likeOrUnlike(val._id)}
                        className={
                            `btn btn-dark me-2 p-2 rounded-3
                                            ${val.likes.filter(p => p.userId === User._id).length > 0 ? 'text-success bg-success-subtle' : ''}`
                        }>
                        <i className="fa-solid fa-thumbs-up me-2"> </i>
                        Like
                    </button>
                    <button
                        onClick={() => showComment(index)}
                        className="btn btn-dark text-white-50 p-2">
                        <i className="fa-regular fa-comment me-2"></i>
                        Comment
                    </button>
                    <div
                        className="mt-4"
                        style={{ display: "none" }}
                        id={'div-' + index}>
                        <div className="input-group mb-4 rounded-5">
                            <input
                                type="text"
                                className="form-control bg-secondary text-white py-2 rounded-start-5"
                                placeholder="Add a comment..."
                                id={"commentInput-" + val._id} />
                            <button
                                className="btn btn-info rounded-end-5"
                                type="button"
                                id="button-addon2"
                                onClick={() => addComment(val._id)}>
                                Send
                            </button>
                        </div>
                        {val.comments.map((commentVal, commentIndex) => {
                            return (
                                <Comment
                                    key={commentIndex}
                                    DateFormat={DateFormat}
                                    commentVal={commentVal}
                                    val={val} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts