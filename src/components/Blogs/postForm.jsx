import React from "react";
import { Button, Input, Col, Row, FormGroup } from "reactstrap";

function PostForm({ changeHandler, handleSubmit, state }) {
  const { title, description, error } = state;
  return (
    <>
      <div className="reply-form mb-5">
        <form action="" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Input
                  name="title"
                  type="text"
                  placeholder="Post Title*"
                  onChange={changeHandler}
                  value={title}
                  className={
                    error.title ? "form-control is-invalid" : "form-control"
                  }
                />
                {error.title && (
                  <div className="invalid-feedback">{error.title}</div>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Description"
                  onChange={changeHandler}
                  value={description}
                  className={
                    error.description
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {error.title && (
                  <div className="invalid-feedback">{error.title}</div>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Button type="submit">Create Post</Button>
        </form>
      </div>
    </>
  );
}

// const mamStateToProps = (state) => ({
//   posts: state.blog,
// });
// export default connect(mamStateToProps, { loadCategory })(PostForm);
export default PostForm;
