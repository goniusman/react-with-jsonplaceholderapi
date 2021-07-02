import React from "react";
import { CustomInput } from "reactstrap";
import { Link } from "react-router-dom";
import Context from "../context";

const RowItem = ({ user }) => (
  <Context.Consumer>
    {({ deleteHandle }) => (
      <tr key={user.id}>
        <td>
          <CustomInput type="checkbox" id={user.id} />
        </td>
        <td>{user.name}</td>
        <td>{user.email} </td>
        <td>{user.website} </td>

        <td className="project-actions text-right">
          <Link
            className="btn btn-primary btn-sm d-inline"
            puser={user}
            to={`/user/profile/${user.id}`}
          >
            <i className="fas fa-folder"></i>
            View
          </Link>

          {/* <Link
            puser={user}
            key={user.id}
            to={`/user/${user.id}`}
            className="btn btn-info btn-sm d-inline"
          >
            <i className="fas fa-pencil-alt"></i>
            Edit
          </Link> */}

          {/* <Link
            className="btn btn-danger btn-sm d-inline"
            onClick={() => deleteHandle(user.id)}
          >
            <i className="fas fa-trash"></i>
            Delete
          </Link> */}
        </td>
      </tr>
    )}
  </Context.Consumer>
);

const TableView = () => {
  return (
    <Context.Consumer>
      {({ paginateUsers: users, shortingItmes }) => (
        <div
          className="card-body p-0"
          style={{ height: "300px", overflow: "auto" }}
        >
          <p>Showing {users.length} </p>
          {users.length ? (
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>Checkbox</th>
                  <th onClick={() => shortingItmes()} style={{ width: "25%" }}>
                    Name
                  </th>
                  <th style={{ width: "30%" }}>Email</th>
                  <th style={{ width: "30%" }}>Webiste</th>
                  <th className="text-right" style={{ width: "50%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users
                    .reverse()
                    .map((user) => <RowItem key={user.id} user={user} />)}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center">There are no user</h1>
          )}
        </div>
      )}
    </Context.Consumer>
  );
};
export default TableView;
