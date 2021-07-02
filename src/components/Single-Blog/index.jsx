import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";
import Footer from "../Footer";

function SingleBlog(props) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState({});
  const [state, setState] = useState({
    comment: "",
    postId: props.match.params.postId && props.match.params.postId,
    author: "osman",
  });

  useEffect(() => {
    let params = props.match.params.postId && props.match.params.postId;
    axios
      .get(`http://localhost:5000/posts/${params}`)
      .then((post) => setPost({ post: post.data }))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let params = props.match.params.postId;
    axios
      .get(`http://localhost:5000/comments?postId=${params}`)
      .then((comments) => setComments({ comments: comments.data }))
      .catch((err) => console.log(err));
  }, [comments]);

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const validatePost = ({ comment }) => {
    const err = {};
    if (comment === "") {
      err.comment = "You Should Provide comment";
    }

    return {
      err,
      isValid: Object.keys(err).length === 0,
    };
  };

  const commentSubmit = (e) => {
    e.preventDefault();
    const { comment, author, postId } = state;
    const { isValid } = validatePost({ comment });
    if (isValid) {
      axios
        .post("http://localhost:5000/comments", { comment, author, postId })
        .then((response) => response)
        .catch((err) => console.log(err));

      setState({ ...state, comment: "" });
    }
  };

  return (
    <>
      {post.post != null ? (
        <div className="main-wrapper test">
          <article className="blog-post px-3 py-5 p-md-5">
            <div className="container">
              <header className="blog-post-header">
                <h2 className="title mb-2">{post.post.title}</h2>
                <div className="meta mb-3">
                  <span className="date">Published 3 months ago</span>
                  <span className="time">5 min read</span>
                  <span className="comment">
                    <a
                      href="window.location"
                      onClick={(e) => e.preventDefault()}
                    >
                      4 comments
                    </a>
                  </span>
                </div>
              </header>

              <div className="blog-post-body">
                <figure className="blog-banner">
                  <img
                    className="img-fluid"
                    src="../uploads/blog/blog-post-banner.jpg"
                    alt="dfgdg"
                  />
                </figure>
                <p>{post.post.description}</p>
                <br />
                <br />
                <br />
                <div className="blog-comments-section">
                  {comments.comments != null ? (
                    comments.comments.map((comment) => (
                      <div id="comment-2" className="comment">
                        <div className="d-flex">
                          <div className="comment-img">
                            <img
                              style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50px",
                                marginRight: "1rem",
                              }}
                              src="../uploads/profile.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <h5>
                              <a
                                onClick={(e) => e.preventDefault()}
                                a
                                href="window.location"
                              >
                                {comment.author}
                              </a>{" "}
                              <a
                                onClick={(e) => e.preventDefault()}
                                href="window.location"
                                className="reply"
                              >
                                <i className="bi bi-reply-fill"></i> Reply
                              </a>
                            </h5>
                            <time datetime="2020-01-01">01 Jan, 2020</time>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h2>there are no comments</h2>
                  )}

                  <div id="disqus_thread">
                    <div className="reply-form">
                      <h4>Leave a Reply</h4>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *{" "}
                      </p>
                      <form action="" onSubmit={commentSubmit}>
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <input
                              name="author"
                              type="hidden"
                              className="form-control"
                              value="authorname"
                            />
                          </div>
                          <div className="col-md-6 form-group">
                            <input
                              name="email"
                              type="hidden"
                              className="form-control"
                              value="myemail@gmail.co"
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col form-group">
                            <Input
                              type="textarea"
                              name="comment"
                              className="form-control"
                              value={state.comment}
                              onChange={changeHandler}
                              placeholder="Type your comment"
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Post Comment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <Footer />
        </div>
      ) : (
        <h2>test</h2>
      )}
    </>
  );
}

export default SingleBlog;
