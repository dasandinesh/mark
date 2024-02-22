import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavComponent = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/order">order</Nav.Link>
              <Nav.Link href="/ProductForm">ProductForm</Nav.Link>
              <Nav.Link href="/product">product</Nav.Link>
              <Nav.Link href="/addproduct">Add product</Nav.Link>
              <Nav.Link href="/saleEntry">Sale</Nav.Link>
              <Nav.Link href="/coustomer">Coustomer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavComponent;
