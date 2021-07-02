import React from "react";
import { Link } from "react-router-dom";
import Context from "../context";

function BlogItem({ post, updatePost, deletePost  }) {

  
  return (
    <Context.Consumer>
      {({isAuthenticated}) => (
        <div className="item mb-5">
          <div className="media">
            <img
              className="mr-3 img-fluid post-thumb d-none d-md-flex"
              src="uploads/blog/blog-post-thumb-1.jpg"
              alt="dfffdg"
            />
            <div className="media-body">
              <h3 className="title mb-1">
                <Link to={`/single-blog/${post.id}`}>{post.title}</Link>
              </h3>
              <div className="meta mb-1">
                <span className="date">Published 2 days ago</span>
                <span className="time">5 min read</span>
                <span className="comment">
                  <a href="window.location">8 comments</a>
                </span>
              </div>
              <div className="intro">{post.description}</div>
              <Link className="more-link" to={`/single-blog/${post.id}`}>
                Read more &rarr;
              </Link>
            </div>
            <div>
              {isAuthenticated ? (
                <>
                  <Link
                    className="btn btn-info btn-sm d-inline"
                    onClick={() => updatePost(post)}
                  >
                    update
                  </Link>
                  <br />
                  <Link
                    className="btn btn-danger btn-sm d-inline"
                    onClick={() => deletePost(post.id)}
                  >
                    delete
                  </Link>
                </>
              ) : (
                "you need to login to update and delete"
              )}
            </div>
          </div>
        </div>
      )}
    </Context.Consumer>
  );
}

export default BlogItem;
