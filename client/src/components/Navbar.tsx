import React from "react";
import { Container, Navbar as Susbar, Button, Nav } from "react-bootstrap";
import UserContext from "../context/UserContext";

function Navbar() {
  return (
    <Susbar bg="dark" variant="dark">
      <Container fluid className="px-4 gap-3">
        <Susbar.Brand className="me-auto">taskbox</Susbar.Brand>
        <Button variant="outline-success">Assign Task</Button>
        <Nav>
          <UserContext.Consumer>
            {(userContext) => (
              <Nav.Link href={"#"} onClick={userContext?.logout}>
                Logout
              </Nav.Link>
            )}
          </UserContext.Consumer>
        </Nav>
      </Container>
    </Susbar>
  );
}

export default Navbar;
