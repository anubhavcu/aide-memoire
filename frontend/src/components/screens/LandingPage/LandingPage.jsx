import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = ({ history }) => {
  // https://reactrouter.com/web/api/Hooks/usehistory

  // const history = useHistory();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      // console.log(history);
      history.push('/notes');
    }
  }, [history]);

  return (
    <div className='landingBackground'>
      <Container>
        <Row>
          <Col>
            <div className='intro-text'>
              <h1 className='title'>Welcome to Notes App! </h1>
              <p className='subtitle'>One safe place for all your notes..</p>
            </div>
          </Col>
          <Row>
            <Col>
              <div className='intro-buttons'>
                <div className='customHover'>
                  <Link to='/login'>
                    <Button className='me-4' variant='primary ' size='lg'>
                      Login
                    </Button>{' '}
                  </Link>
                </div>
                <div className='customHover'>
                  <Link to='/register'>
                    <Button className='ms-4 ' variant='secondary' size='lg'>
                      Sign Up
                    </Button>{' '}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
