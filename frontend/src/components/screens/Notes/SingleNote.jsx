import React, { useEffect, useState } from 'react';
import MainScreen from '../../MainScreen';
import {
  Button,
  Card,
  CardGroup,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  notesDeleteAction,
  updateNoteAction,
} from '../../../redux/actions/notesActions';
import ErrorMessage from '../../ErrorMessage';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SingleNote = ({ history, match }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(notesDeleteAction(id));
    }
    history.push('/notes');
  };

  useEffect(() => {
    fetching();
  }, [match.params.id, date]);

  const fetching = async () => {
    const { data } = await axios.get(`/api/notes/${match.params.id}`);

    setTitle(data.title);
    setContent(data.content);
    setCategory(data.category);
    setDate(data.updatedAt);
  };

  const resetHandler = () => {
    setTitle('');
    setCategory('');
    setContent('');
  };

  const updateHandler = (e) => {
    e.preventDefault();
    console.log(title, content, category);
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push('/notes');
  };

  return (
    <Container>
      <h3>Edit note </h3>
      <div className='ms-auto me-3'>
        <Link to='/notes'>
          <Button className='  m-2' variant='primary'>
            Go back
          </Button>
        </Link>
      </div>

      <CardGroup style={{ minHeight: '80vh' }}>
        {/* <MainScreen title='Create a Note'></MainScreen> */}
        <Card>
          <Card.Header>Start editing your note.. </Card.Header>

          <Card.Body>
            <Form onSubmit={updateHandler}>
              {error && (
                <ErrorMessage variant='danger' text={error}></ErrorMessage>
              )}
              {errorDelete && (
                <ErrorMessage
                  variant='danger'
                  text={errorDelete}
                ></ErrorMessage>
              )}
              <Form.Group controlId='title' className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='title'
                  value={title}
                  placeholder='Enter the title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='content' className='mb-3'>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as='textarea'
                  value={content}
                  placeholder='Enter the content. Tip: you can write markdown too!'
                  rows={20}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='content' className='mb-3'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='content'
                  value={category}
                  placeholder='Enter the Category'
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Button variant='primary' type='submit' size='lg'>
                Update Note
              </Button>
              <Button
                className='mx-2'
                onClick={resetHandler}
                variant='warning'
                size='lg'
              >
                Reset Feilds
              </Button>

              <Button
                className='mx-2'
                onClick={() => handleDelete(match.params.id)}
                variant='danger'
                size='lg'
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className='text-muted'>
            Updating on - {date.substring(0, 10)}
          </Card.Footer>
        </Card>
        <Card>
          {/* {content && (
            <Card>
              <Card.Header>Note Preview</Card.Header>
              <Card.Body>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Card.Body>
            </Card>
          )} */}
          <Card>
            <Card.Header>Note Preview</Card.Header>
            {content && (
              <Card.Body>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Card.Body>
            )}
          </Card>
        </Card>
      </CardGroup>
    </Container>
  );
};

export default SingleNote;
