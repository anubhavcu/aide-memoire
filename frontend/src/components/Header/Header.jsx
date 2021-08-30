import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to='/'>Aide memoire</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className=''>
              <Nav.Link>
                <Link to='/notes'>My Notes</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/dashboard'>Dashboard</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/'>Log out</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
