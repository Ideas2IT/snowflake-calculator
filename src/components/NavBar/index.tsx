import React from 'react';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/img/i2i-new-logo.png'; // with import

class NavBar extends React.Component {
  public render() {
    return (
      <Navbar className='navbarColor' variant='dark' expand='lg'>
        <Navbar.Brand>
          <Nav.Link className='navLink' href='/'>
            <div className='d-flex align-items-center'>
              <img className='logo' alt='' src={logo}></img>
              <span className='brand-title ml-3 pt-3'>Snowflake Pricing</span>
            </div>
          </Nav.Link>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
