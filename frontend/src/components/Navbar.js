import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function NavigationBar() {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="text-success fw-bold">
          <img src="./assets/Logo.png" alt="logo" width="30" /> GreenStation
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/find-stations">Find Stations</Nav.Link>
            <Nav.Link href="/rewards">Rewards</Nav.Link>
          </Nav>
          <Nav className="ms-3">
            {user ? (
              <>
                <span className="me-3 fw-bold">Welcome, {user.name}</span>
                <Button variant="outline-success" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <a href="http://localhost:5000/api/auth/google">
                <Button variant="success">Sign in with Google</Button>
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
