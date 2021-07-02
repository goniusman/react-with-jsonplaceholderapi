import React from "react";
import { CustomInput } from "reactstrap";
import { Link } from "react-router-dom";

const RowItem = ({ post, Delete }) => (
  <>
    <tr key={post.id}>
      <td>
        <CustomInput type="checkbox" id={post.id} />
      </td>
      <td>{post.title}</td>
      <td>{post.description} </td>

      <td className="project-actions text-right">
        <Link
          className="btn btn-primary btn-sm d-inline"
          ppost={post}
          to={`/post/${post.id}`}
        >
          <i className="fas fa-folder"></i>
          View
        </Link>

        <Link
          ppost={post}
          key={post.id}
          to={`/post/${post.id}`}
          className="btn btn-info btn-sm d-inline"
        >
          <i className="fas fa-pencil-alt"></i>
          Edit
        </Link>

        <Link
          className="btn btn-danger btn-sm d-inline"
          onClick={() => Delete(post.id)}
        >
          <i className="fas fa-trash"></i>
          Delete
        </Link>
      </td>
    </tr>
  </>
);

const TableView = ({ posts, deleteHandle }) => {
  return (
    <>
      <div
        className="card-body p-0"
        style={{ height: "300px", overflow: "auto" }}
      >
        {posts.length ? (
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th style={{ width: "5%" }}>Checkbox</th>
                <th style={{ width: "25%" }}>title</th>
                <th style={{ width: "30%" }}>Description</th>
                <th className="text-right" style={{ width: "50%" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 &&
                posts
                  .reverse()
                  .map((post) => (
                    <RowItem key={post.id} post={post} Delete={deleteHandle} />
                  ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center">There are no post</h1>
        )}
      </div>
    </>
  );
};
export default TableView;
