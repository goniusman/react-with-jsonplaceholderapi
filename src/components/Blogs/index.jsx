import React, { Component } from "react";
import Axios from "axios";
import { v4 as UUIDV4 } from "uuid";
import Context from "../context";

import BlogItem from "./Blog-item";
import Footer from "../Footer";
import PostForm from "./postForm";
import UpdatePost from "./updatePost";

class Blog extends Component {
  state = {
    title: "",
    description: "",
    id: UUIDV4(),
    error: {},
    updateForm: false,
    postSize: 2,
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validatePost = ({ title, description }) => {
    const err = {};
    if (title === "") {
      err.title = "You Should Provide Title";
    }
    if (description === "") {
      err.description = "You Should Provide Description";
    }

    return {
      err,
      isValid: Object.keys(err).length === 0,
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const authorId = this.context.user.id;
    const { title, description, id } = this.state;

    const { err, isValid } = this.validatePost({ title, description });
    if (isValid) {
      Axios.post("http://localhost:5000/posts", {
        id,
        title,
        description,
        authorId,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.setState({ title: "", description: "", error: {} });
    } else {
      this.setState({ error: err });
    }
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const { title, description, id } = this.state;
    Axios.put(`http://localhost:5000/posts/${id}`, {
      title,
      description,
    });
    this.setState({ title: "", description: "", updateForm: false });
  };

  updatePost = (e) => {
    this.setState({
      title: e.title,
      description: e.description,
      id: e.id,
      updateForm: true,
    });
    console.log(e);
  };

  deletePost = (e) => {
    Axios.delete(`http://localhost:5000/posts/${e}`)
      .then(() => console.log("deleted"))
      .catch((err) => console.log(err));

    this.context.updateState();
    // console.log(this.context);
  };

  lodeMore = () => {
    let resize = this.state.postSize;
    resize += 2;
    this.setState({ postSize: resize });
  };

  render() {
    const { posts, isAuthenticated } = this.context;
    const { postSize } = this.state;

    return (
      <>
        <div className="main-wrapper">
          <section className="cta-section theme-bg-light py-5">
            <div className="container text-center">
              <h2 className="heading">
                DevBlog - A Blog Template Made For Developers
              </h2>
              <br />
              <br />

              {isAuthenticated ? (
                this.state.updateForm ? (
                  <UpdatePost
                    changeHandler={this.changeHandler}
                    handleUpdate={this.handleUpdate}
                    state={this.state}
                  />
                ) : (
                  <PostForm
                    changeHandler={this.changeHandler}
                    handleSubmit={this.handleSubmit}
                    state={this.state}
                  />
                )
              ) : (
                ""
              )}
            </div>
          </section>

          <section className="blog-list px-3 py-5 p-md-5">
            <div className="container">
              {posts.length > 0 ? (
                posts
                  .reverse()
                  .slice(0, postSize)
                  .map((post) => (
                    <BlogItem
                      key={post.id}
                      updatePost={this.updatePost}
                      deletePost={this.deletePost}
                      post={post}
                    />
                  ))
              ) : (
                <h1>There are no posts</h1>
              )}
            </div>

            <nav className="blog-nav nav nav-justified my-5">
              {posts && posts.length > postSize ? (
                <a
                  className="nav-link-next nav-item nav-link rounded"
                  onClick={this.lodeMore}
                  style={{ cursor: "pointer" }}
                >
                  Loadmore
                  <i className="arrow-next fas fa-long-arrow-alt-right"></i>
                </a>
              ) : (
                <a
                  className=" nav-item nav-link rounded"
                  style={{ color: "red" }}
                >
                  There are no posts
                </a>
              )}
            </nav>
          </section>

          <Footer />
        </div>
      </>
    );
  }
}
Blog.contextType = Context;
export default Blog;
