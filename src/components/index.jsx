import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import { paginate } from "./Common/utiles";
import Context from "./context";
import Blog from "./Blogs";
import Profile from "./Profile";
import SingleBlog from "./Single-Blog";
import Header from "./Header";
import Register from "./pages/register";
import Login from "./pages/login";
import About from "./pages/about";
import User from "./Users";
import Dashboard from "./Dashboard";

class MyBlog extends Component {
  state = {
    pageSize: 2,
    currentPage: 1,
    posts: [],
    comments: [],
    users: [],
    user: {},
    searchTerm: "",
    isAuthenticated: localStorage.getItem("user") ? true : false,
  };

  loadPosts = () => {
    fetch("http://localhost:5000/register")
      .then((response) => response.json())
      .then((users) => this.setState({ users }))
      .catch((err) => console.log(err));

    Axios.get("http://localhost:5000/posts")
      .then((response) => this.setState({ posts: response.data }))
      .catch((err) => console.log(err));
  };

  logOut = () => {
    localStorage.removeItem("user");
    this.setState({ isAuthenticated: false });
  };

  componentDidMount() {
    this.loadPosts();
    this.setUserForLogin();
  }

  updateState() {
    // const anotherposts = this.state.posts.filter((post) => post.id !== id);
    // this.loadPosts();
    // this.setState({ posts: anotherposts });
  }

  deleteHandle = (i) => {
    console.log(i);
  };

  pageChangeEvent = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleSeach = (value) => {
    this.setState({ searchTerm: value });
  };

  performSearch = () => {
    if (this.state.users.length > 0) {
      return this.state.users.filter((user) =>
        user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    }
  };

  performSearchforposts = (e) => {
    if (this.state.posts.length > 0) {
      return this.state.posts.filter((post) =>
        post.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    }
  };

  setUserForLogin = () => {
    const user = localStorage.getItem("user");
    const parsinguser = JSON.parse(user);
    this.setState({ user: parsinguser });
  };

  shortingItmes = () => {
    let { users } = this.state;
    users.sort();
    return users;
  };

  render() {
    const { currentPage, pageSize } = this.state;
    const users = this.performSearch();
    let paginateUsers = paginate(users, currentPage, pageSize);

    return (
      <Context.Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          logOut: this.logOut,
          deleteHandle: this.deleteHandle,
          pageChangeEvent: this.pageChangeEvent,
          paginateUsers: paginateUsers,
          handleSeach: this.handleSeach,
          performSearchforposts: this.performSearchforposts,
          setUserForLogin: this.setUserForLogin,
          shortingItmes: this.shortingItmes,
        }}
      >
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Blog} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/users" exact component={User} />
            <Route path="/user/profile/:userId" exact component={Profile} />
            <Route path="/about" exact component={About} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/single-blog/:postId" component={SingleBlog} />
          </Switch>
        </Router>
      </Context.Provider>
    );
  }
}

export default MyBlog;
