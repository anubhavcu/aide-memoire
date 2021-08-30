import { Container, Row, Col, Button } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {
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
                <Button
                  className='mx-4 customButton'
                  variant='primary '
                  size='lg'
                >
                  Login
                </Button>{' '}
                <Button
                  className='mx-2 customButton'
                  variant='secondary'
                  size='lg'
                >
                  Sign Up
                </Button>{' '}
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
