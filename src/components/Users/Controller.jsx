import React from "react";
import { Input } from "reactstrap";
import Context from "../context";

const Controller = () => (
  <Context.Consumer>
    {({ term, handleSeach }) => (
      <div className="d-flex my-4">
        <Input
          placeholder="Enter Search Team"
          className="mr-3"
          value={term}
          onChange={(e) => handleSeach(e.target.value)}
        />
      </div>
    )}
  </Context.Consumer>
);

export default Controller;
