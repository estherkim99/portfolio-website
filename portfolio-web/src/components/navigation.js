import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Navigation() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
        <Navbar.Brand href="/">Esther Kim</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/about">About Me</Nav.Link> */}
            <Nav.Link href="/#/cv">CV</Nav.Link>
            <Nav.Link href="/#/projects">Projects</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <style type="text/css">
        {` `}
      </style>
    </>
  );
}
