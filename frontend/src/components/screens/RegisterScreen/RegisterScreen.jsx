import MainScreen from '../../MainScreen';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorMessage from '../../ErrorMessage';
import { register } from '../../../redux/actions/userActions';

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push('/notes');
    }
  }, [history, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('passwords do not match!');
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  // for generating pic link by uploading to cloudinary -- see docs for reference
  // https://api.cloudinary.com/v1_1/anubhav/image/upload
  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage('Please Select an Image');
    }
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'aide-memoire');
      data.append('cloud_name', 'anubhav');
      fetch('https://api.cloudinary.com/v1_1/anubhav/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please select an Image');
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
            {picMessage && (
              <ErrorMessage variant='danger' text={picMessage}>
                {' '}
              </ErrorMessage>
            )}
            <Form.Group controlId='formFile' className='mb-3'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                id='custom-file'
                type='image/png'
                // label='Upload Profile Picture'
                onChange={(e) => postDetails(e.target.files[0])}
                custom
              />
            </Form.Group>

            {!loading && (
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
