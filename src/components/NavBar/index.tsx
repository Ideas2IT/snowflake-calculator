import React from 'react';
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/img/i2i-new-logo.png'; // with import


class NavBar extends React.Component {
  public render() {
    return (
      <Navbar className="navbarColor"  variant="dark" expand="lg">
        <Navbar.Brand>
          <img className="logo" alt="" src={logo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={"/"}>
            <Nav.Link className="navLink" href="/">Snowflake Pricing</Nav.Link>
            {/* <Nav.Link  href="#home">Home</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>    
    );
  }

}

export default NavBar;
 