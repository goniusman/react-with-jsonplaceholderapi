import React, { Component } from "react";

import Footer from "../Footer";
import { paginate } from "../Common/utiles";
import Context from "../context";
import TableView from "./TableView";
import Search from "../Common/search";
import { Redirect } from "react-router-dom";
import Paginate from "../Common/pagination";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentPage: 1,
    posts: [],
  };

  componentDidMount() {
    let userId = this.props.match.params.userId;
    const { performSearchforposts } = this.context;

    let posts = performSearchforposts();

    let filteringPosts = posts.filter((post) => post.authorId == userId);

    this.setState({ posts: filteringPosts });
  }

  pageChangeEvent = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  deleteHandle = (i) => {
    console.log(i);
  };

  render() {
    const { currentPage, posts } = this.state;
    const { pageSize, isAuthenticated, performSearchforposts } = this.context;
    // const searchPosts = performSearchforposts();
    let aposts = paginate(posts, currentPage, pageSize);

    return (
      <>
        {isAuthenticated ? (
          <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
              <div className="container text-center">
                <h2 className="heading">Profile</h2>
                <br />
                <br />
              </div>
            </section>

            <div className="container">
              <Search term={this.state.searchTerm} />

              <TableView posts={aposts} deleteHandle={this.deleteHandle} />

              <Paginate
                items={posts && posts.length}
                currentPage={currentPage}
                pageSize={pageSize}
                pageChange={this.pageChangeEvent}
              />
            </div>

            <Footer />
          </div>
        ) : (
          <Redirect to="/dashboard" />
        )}
      </>
    );
  }
}

Profile.contextType = Context;
export default Profile;
