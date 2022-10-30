import CartWidget from "../CartWidget/CartWidget";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom';
const NavBar = () =>{
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Nav.Link as={NavLink} to='/' exact>IV Technology</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to='/category/almacenamiento' exact>Almacenamiento</Nav.Link>
            <Nav.Link as={NavLink} to='/category/perifericos' exact>Perifericos</Nav.Link>
            <Nav.Link as={NavLink} to='/category/gabinetes' exact>Gabinetes</Nav.Link>
            <Nav.Link as={NavLink} to='/category/monitores' exact>Monitores</Nav.Link>
          </Nav> 
          <CartWidget/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;