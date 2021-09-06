import MainScreen from '../../MainScreen';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        '/api/users/login',
        {
          email: email,
          password: password,
        },
        config
      );
      // console.log(res);
      console.log(data);

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <MainScreen title='LOGIN' children='hello world'>
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}
        >
          {error && <ErrorMessage variant='danger' text={error}></ErrorMessage>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {loading === false && (
              <Button variant='primary' type='submit'>
                Submit
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
                Logging in...
              </Button>
            )}
          </Form>
          <Row className='py-3'>
            <Col>
              Don't have an account ? Register{' '}
              <Link to='/register' style={{ color: 'blue' }}>
                here
              </Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  );
};

export default LoginScreen;
