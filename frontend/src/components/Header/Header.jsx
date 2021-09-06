import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand className='customHover'>
            <Link to='/'>Aide memoire</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto me-3'>
              <Nav.Link className='customHover'>
                <Link to='/notes'>
                  <i className='fas fa-book-open'></i> My Notes
                </Link>
              </Nav.Link>
              <Nav.Link className='customHover'>
                <Link to='/dashboard'>
                  <i className='fas fa-user'></i> Dashboard
                </Link>
              </Nav.Link>
              <Nav.Link className='customHover'>
                <Link
                  to='/'
                  onClick={() => {
                    localStorage.removeItem('userInfo');
                  }}
                >
                  <i className='fas fa-sign-out-alt'></i> Log out
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// Bootstrap class update: ml-auto => ms-auto
// mr-auto => me-auto
// ! old one's still working with buttons though
// refer link : https://stackoverflow.com/a/18672475
