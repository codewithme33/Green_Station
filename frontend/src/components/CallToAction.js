import React from "react";
import { Container, Button } from "react-bootstrap";
import "./style.css"

function CallToAction() {
  return (
    <Container fluid className="cta-section text-center py-5">
      <h2 className="fw-bold">Ready to Go Green?</h2>
      <p>Join thousands of EV owners making a difference with GreenStation.</p>
      <Button variant="success" size="lg">Get Started Now ⚡</Button>
    </Container>
  );
}

export default CallToAction;
