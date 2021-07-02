import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col, Button } from "reactstrap";
import Context from "../context";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    axios
      .get(`http://localhost:5000/register?email=${email}&password=${password}`)
      .then((res) => {
        if (res.data.length > 0) {
          setItem(res.data);
        } else {
          console.log("you are not valid user");
        }
      })
      .catch((err) => console.log(err));

    setState({ email: "", password: "" });
  };

  const setItem = (item) => {
    localStorage.setItem("user", JSON.stringify(item[0]));
  };

  return (
    <Context.Consumer>
      {({ isAuthenticated }) =>
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="main-wrapper">
            <section className="cta-section theme-bg-light py-5">
              <div className="container text-center">
                <h2 className="heading">Login Here</h2>
                <br />
                <br />
                <Form onSubmit={loginSubmit}>
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
                      />
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
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button>Login</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </section>
          </div>
        )
      }
    </Context.Consumer>
  );
}

export default Login;
