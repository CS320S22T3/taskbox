import React from "react";
import { Container, Navbar as Susbar, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";

function Navbar() {
  return (
    <Susbar bg="dark" variant="dark">
      <Container fluid={true}>
        <Susbar.Brand>taskbox</Susbar.Brand>
        <UserContext.Consumer>
          {(userContext) => (
            <Container
              fluid={true}
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button style={{ margin: "5px" }} variant="outline-success">
                Assign Task
              </Button>
              <Button
                onClick={userContext?.logout}
                style={{ margin: "5px" }}
                variant="outline-secondary"
              >
                Logout
              </Button>
            </Container>
          )}
        </UserContext.Consumer>
      </Container>
    </Susbar>
  );
}

export default Navbar;
