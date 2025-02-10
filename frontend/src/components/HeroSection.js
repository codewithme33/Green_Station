import React from "react";
import { Container, Button } from "react-bootstrap";

function HeroSection() {
  return (
    <Container className="text-center py-5">
      <h1 className="fw-bold">
        Charge Smarter, <span className="text-success">Live Greener</span>
      </h1>
      <p className="text-muted">
        Find and book EV charging stations near you. Earn rewards while helping the environment.
      </p>
      <div>
        <Button variant="success" className="me-3">Find Stations →</Button>
        <Button variant="outline-dark">Learn More</Button>
      </div>
    </Container>
  );
}

export default HeroSection;
