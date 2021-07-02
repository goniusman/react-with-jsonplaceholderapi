import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";
import Context from "../context";

function Register() {
  const [err, setError] = useState({});
  const [state, setState] = useState({
    name: "",
    email: "",
    website: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const validateUser = ({ name, email, website, password }) => {
    const err = {};
    if (name === "") {
      err.name = "You Should Provide name";
    }
    if (email === "") {
      err.email = "You Should Provide email";
    }
    if (website === "") {
      err.website = "You Should Provide website";
    }
    if (password === "") {
      err.password = "You Should Provide password";
    }

    return {
      err,
      isValid: Object.keys(err).length === 0,
    };
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const { name, email, website, password } = state;
    const { err, isValid } = validateUser(state);
    if (isValid) {
      axios
        .post("http://localhost:5000/register", {
          name,
          email,
          website,
          password,
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

      setState({ name: "", email: "", website: "", password: "" });
      setError({});
    } else {
      console.log(err);
      setError({ err });
    }
  };

  return (
    <Context.Consumer>
      {({ isAuthenticated }) =>
        !isAuthenticated ? (
          <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
              <div className="container text-center">
                <h2 className="heading">Register Here</h2>
                <br />
                <br />
                <Form onSubmit={registerSubmit}>
                  <FormGroup row>
                    <Label for="exampleName" sm={2}>
                      Name
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="name"
                        id="exampleName"
                        placeholder="with a placeholder"
                        onChange={changeHandler}
                        value={state.name}
                        className={
                          err.name ? "form-control is-invalid" : "form-control"
                        }
                      />
                      {err.name && (
                        <div className="invalid-feedback">{err.name}</div>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Email
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="with a placeholder"
                        onChange={changeHandler}
                        value={state.email}
                        className={
                          err.email ? "form-control is-invalid" : "form-control"
                        }
                      />
                      {err.email && (
                        <div className="invalid-feedback">{err.email}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                      Website
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="website"
                        name="website"
                        id="examplewebsite"
                        placeholder="with a placeholder"
                        onChange={changeHandler}
                        value={state.website}
                        className={
                          err.website
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      {err.website && (
                        <div className="invalid-feedback">{err.website}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" sm={2}>
                      Password
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="password placeholder"
                        onChange={changeHandler}
                        value={state.password}
                        className={
                          err.password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      {err.password && (
                        <div className="invalid-feedback">{err.password}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button type="submit">Register</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </section>
          </div>
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    </Context.Consumer>
  );
}

export default Register;
