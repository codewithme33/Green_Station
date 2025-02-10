import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaAward, FaClock } from "react-icons/fa";
import "./style.css"

function Features() {
    
  return (
    <Container className="text-center my-5">
      <Row>
        <Col md={4}>
          <div className="feature-card">
            <FaMapMarkerAlt size={40} className="text-success" />
            <h5 className="fw-bold mt-3">Smart Location</h5>
            <p>Find the nearest charging stations with real-time availability updates.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <FaAward size={40} className="text-success" />
            <h5 className="fw-bold mt-3">Earn Rewards</h5>
            <p>Get points for every charge and redeem them for exclusive benefits.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card">
            <FaClock size={40} className="text-success" />
            <h5 className="fw-bold mt-3">Easy Booking</h5>
            <p>Reserve your charging slot in advance and skip the queue.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;
