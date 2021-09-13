import React, { useEffect, useState } from 'react';
import MainScreen from '../../MainScreen';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createNoteAction } from '../../../redux/actions/notesActions';
import ErrorMessage from '../../ErrorMessage';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

function CreateNote({ history }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const createNote = useSelector((state) => state.createNote);
  const { loading, error, note } = createNote;

  console.log(note);

  const resetHandler = () => {
    setTitle('');
    setCategory('');
    setContent('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push('/notes');
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Link to='/notes'>
        <Button className='mt-2  mx-4' variant='primary'>
          Go back
        </Button>
      </Link>

      <MainScreen title='Create a Note'>
        <Card>
          <Card.Header>Create a new Note</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {error && (
                <ErrorMessage variant='danger' text={error}></ErrorMessage>
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
                  placeholder='Enter the content'
                  rows={4}
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
              {loading === false && (
                <Button variant='primary' type='submit' size='lg'>
                  Submit
                </Button>
              )}
              {loading && (
                <Button variant='primary' size='lg' disabled>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  Creating note...
                </Button>
              )}

              <Button
                className='mx-2'
                onClick={resetHandler}
                variant='danger'
                size='lg'
              >
                Reset Feilds
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className='text-muted'>
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
        {content && (
          <Card>
            <Card.Header>Note Preview</Card.Header>
            <Card.Body>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Card.Body>
          </Card>
        )}
      </MainScreen>
    </Container>
  );
}

export default CreateNote;
