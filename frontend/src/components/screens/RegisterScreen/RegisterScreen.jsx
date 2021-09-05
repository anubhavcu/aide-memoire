import MainScreen from '../../MainScreen';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  return (
    <div>
      <MainScreen title='REGISTER'>
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}
        >
          <Form>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='Enter name' />
            </Form.Group>

            <Form.Group controlId='formBasicEmail' className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group controlId='formBasicPassword' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' placeholder='Confirm Password' />
            </Form.Group>

            {/* <Form.Group controlId='formFile'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                id='custom-file'
                type='image/png'
                label='Upload Profile Picture'
                custom
              />
            </Form.Group> */}

            <Button variant='primary' type='submit'>
              Register
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account ?{' '}
              <Link to='/login' style={{ color: 'blue' }}>
                Login
              </Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  );
};

export default RegisterScreen;
