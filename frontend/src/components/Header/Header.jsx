import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import Search from '../Search/Search';
const Header = ({ history, setSearch }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };
  return (
    <header>
      <Navbar variant='dark' bg='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand className='customHover'>
            <Link to='/'>Aide memoire</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {userInfo && <Search setSearch={setSearch} />}
            {userInfo ? (
              <Nav className='ms-auto me-3' style={{ width: '50%' }}>
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
                <Nav.Link className='customHover' onClick={logoutHandler}>
                  {/* <Link to='' onClick={logoutHandler}> */}
                  <i className='fas fa-sign-out-alt'></i> Log out
                  {/* </Link> */}
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className='ms-auto me-3 '>
                <Nav.Link className='customHover'>
                  <Link to='/login'>
                    <i className='fas fa-sign-in-alt'></i> Log In
                  </Link>
                </Nav.Link>
              </Nav>
            )}
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
