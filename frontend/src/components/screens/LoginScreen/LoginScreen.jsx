import MainScreen from '../../MainScreen';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/userActions';
import ErrorMessage from '../../ErrorMessage';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // const userData = localStorage.getItem('userInfo');
    if (userInfo) {
      history.push('/notes');
    }
  }, [history, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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

            {!loading && (
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
