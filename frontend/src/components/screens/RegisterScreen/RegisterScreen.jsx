import MainScreen from '../../MainScreen';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          '/api/users/register',
          { name, email, password, pic },
          config
        );

        setLoading(false);
        console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <MainScreen title='REGISTER'>
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}
        >
          {error && <ErrorMessage variant='danger' text={error}></ErrorMessage>}
          {message && (
            <ErrorMessage variant='danger' text={message}></ErrorMessage>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicEmail' className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                id='custom-file'
                type='image/png'
                // label='Upload Profile Picture'
                // value={pic}
                // onChange={(e) => setPic(e.target.value)}
                custom
              />
            </Form.Group>

            {loading === false && (
              <Button variant='primary' type='submit'>
                Register
              </Button>
            )}
            {loading && (
              <Button variant='primary' disabled>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  // variant='success'
                  aria-hidden='true'
                />
                Setting up your account ..
              </Button>
            )}
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
