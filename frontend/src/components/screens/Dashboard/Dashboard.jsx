import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import MainScreen from '../../MainScreen';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  userDeleteAction,
  userUpdateAction,
} from '../../../redux/actions/userActions';
import ErrorMessage from '../../ErrorMessage';
import { USER_UPDATE_FAIL } from '../../../redux/constants/userConstants';
import { notesDeleteAction } from '../../../redux/actions/notesActions';

const Dashboard = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateUser = useSelector((state) => state.updateUser);
  let { loading, error, success } = updateUser;

  // for deleting all notes of user when he deletes his profile
  const notesList = useSelector((state) => state.notesList);
  const { notes } = notesList;
  console.log(notes);

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  // for generating an image url via cloudinary
  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'aide-memoire');
      data.append('cloud_name', 'anubhavcu');
      fetch('https://api.cloudinary.com/v1_1/anubhav/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please Select an Image');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(userUpdateAction({ name, email, password, pic }));
    } else {
      // window.alert('Passwords do not match !');
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          "passwords don't match, either leave the password blank or enter same values in password/confirm password",
      });
    }
  };

  //delete account
  const handleDelete = () => {
    if (
      window.confirm('Are you sure ? You will not be able to undo this action.')
    ) {
      console.log(userInfo._id);
      dispatch(userDeleteAction(userInfo._id));
      notes.forEach((note) => dispatch(notesDeleteAction(note._id))); // delete all notes of the user
      dispatch(logout()); // for cleaning up local storage
      history.push('/');
    }
  };

  return (
    <Container>
      <div>
        <Link to='/notes'>
          <Button className='  m-2' variant='primary'>
            Go back
          </Button>
        </Link>
      </div>
      <MainScreen title='EDIT PROFILE'>
        <div>
          <Row>
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {success && (
                  <ErrorMessage
                    variant='success'
                    text='Updated Successfully'
                  ></ErrorMessage>
                )}
                {error && (
                  <ErrorMessage variant='danger' text={error}>
                    {}
                  </ErrorMessage>
                )}
                <Form.Group controlId='name' className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='mb-3'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='mb-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{' '}
                {picMessage && (
                  <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
                )}
                <Form.Group controlId='pic' className='mb-3'>
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.File
                    onChange={(e) => postDetails(e.target.files[0])}
                    id='custom-file'
                    type='image/png'
                    custom
                  />
                </Form.Group>
                <Button type='submit' variant='primary'>
                  Update
                </Button>
                <Button
                  className='mx-2'
                  variant='danger'
                  className='mx-2'
                  onClick={handleDelete}
                >
                  Delete Account
                </Button>
              </Form>
            </Col>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={pic}
                alt={name}
                className='profilePic'
                style={{
                  borderRadius: '250px',
                  width: '60%',
                }}
              />
            </Col>
          </Row>
        </div>
      </MainScreen>
    </Container>
  );
};

export default Dashboard;
