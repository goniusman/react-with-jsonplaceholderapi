import React from "react";
import { Redirect } from "react-router-dom";

import Footer from "../Footer";
import Context from "../context";
import TableView from "./TableView";
import Search from "../Common/search";
import Paginate from "../Common/pagination";

const User = () => {
  return (
    <Context.Consumer>
      {({ pageSize, users, isAuthenticated, currentPage, pageChangeEvent }) =>
        isAuthenticated ? (
          <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
              <div className="container text-center">
                <h2 className="heading">User</h2>
                <br />
                <br />
              </div>
            </section>

            <div className="container">
              <Search />

              <TableView />

              <Paginate
                items={users && users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                pageChange={pageChangeEvent}
              />
            </div>

            <Footer />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    </Context.Consumer>
  );
};

export default User;
