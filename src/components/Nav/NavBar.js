import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ValueContext} from "../Context/Context";
import Search from "./Search";

/*ToDo: 
Needs some refactoring
Remove react-bootstrap and use regular components
*/
export default function NavBar() {
  const {val} = useContext(ValueContext);
  
  return (
      <Navbar  className="navbar" fixed="top">
        <Container className="nav">
          <Navbar.Brand  className="mr-auto me-13"><Link to="/">{<i className="fa fa-cubes fa-2x icon" aria-hidden="true"></i>}</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Search/>
            <Nav><Link to="/" className="nav--link">Overview</Link></Nav>
            <Nav><Link to="/form" className="nav--link">Form</Link></Nav>
          </Nav>
          <NavDropdown className="nav--link" title="Ratios" id="basic-nav-dropdown">
              <NavDropdown.Item >
                <Link to="/profitability" className="nav--link_drop">Profitability</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <Link to="/valuation" className="nav--link_drop">Valuation</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <Link to="/leverage" className="nav--link_drop">Leverage</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/operational" className="nav--link_drop">Operational</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <Link to="/allRatios" className="nav--link_drop">All Ratios</Link>
              </NavDropdown.Item>
            </NavDropdown>
        </Container>
      </Navbar>
  );
}