import React from "react";
import { Container, Navbar as Susbar, Button, Nav } from "react-bootstrap";
import UserContext from "../context/UserContext";

function Navbar() {
  return (
    <UserContext.Consumer>
      {(userContext) => (
        <>
          <Susbar bg="dark" variant="dark">
            <Container fluid className="px-4 gap-3">
              <Susbar.Brand className="me-auto">{`</taskbox>`}</Susbar.Brand>
              <Susbar.Brand className="me-auto">{`Welcome, ${userContext.user?.first_name} ${userContext.user?.last_name}`}</Susbar.Brand>
              <Button variant="outline-success">Assign Task</Button>
              <Nav>
                <Nav.Link href={"#"} onClick={userContext.logout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Container>
          </Susbar>
        </>
      )}
    </UserContext.Consumer>
  );
}

export default Navbar;
