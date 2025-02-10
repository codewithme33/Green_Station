import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="Home" className="text-success fw-bold">
         <img src="../Logo.png" alt="logo"/>GreenStation
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Find Stations</Nav.Link>
            <Nav.Link href="#">Rewards</Nav.Link>
          </Nav>
          <Nav className="ms-3">
            <Nav.Link href="#" className="fw-bold">Sign In</Nav.Link>
            <Button variant="success">Get Started</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
