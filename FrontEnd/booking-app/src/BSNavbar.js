
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './BSNavbar.css';

function BSNavbar() {

  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // return (
  //   <>
  //   <Container className="bg-dark text-light p-3 m-0" fluid>
  //   <Navbar bg="dark" data-bs-theme="dark" > 
  //     {/* <Container> */}
  //       <Navbar.Brand href="#home">Navbar</Navbar.Brand>
  //       <Nav className="ms-auto">
  //         <Nav.Link href="#home">Home</Nav.Link>
  //         <Nav.Link href="#features">Features</Nav.Link>
  //         <Nav.Link href="#pricing">Pricing</Nav.Link>
  //       </Nav>
  //     {/* </Container> */}
  //   </Navbar>
  //   </Container>
  //   </>
  // );

  return (
  <>
  <Container className="bg-dark text-light p-3 m-0" fluid>
  <Navbar
      expand="lg"
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      fixed="top"
      bg='black' data-bs-theme="dark" 
    >
      
        <Navbar.Brand href="#home" className="navbar-brand">
          Reserve Grounds
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    </Container>
    </>
  );
}

export default BSNavbar;