import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PRODUCTS_PAGE, CATEGORIES_PAGE, DELIVERY_PAGE, ABOUT_PAGE, CONTACTS_PAGE } from "../utils/constants";
import { LinkContainer } from "react-router-bootstrap";

function NavigationBar() {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to={ PRODUCTS_PAGE }>
            <Navbar.Brand>StorePj</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to={ PRODUCTS_PAGE }>
                <Nav.Link>Products</Nav.Link>
              </LinkContainer>
              <LinkContainer to={ CATEGORIES_PAGE }>
                <Nav.Link>Categories</Nav.Link>
              </LinkContainer>
              <LinkContainer to={ DELIVERY_PAGE }>
                <Nav.Link>Delivery</Nav.Link>
              </LinkContainer>
              <LinkContainer to={ ABOUT_PAGE }>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to={ CONTACTS_PAGE }>
                <Nav.Link>Contacts</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    );
}

export default NavigationBar;