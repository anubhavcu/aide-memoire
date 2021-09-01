import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../MainScreen';
import { useEffect } from 'react';
import notes from '../../../notes.js';

const Notes = () => {
  useEffect(() => {
    console.log(notes);
  }, []);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
    }
  };
  return (
    <MainScreen title='Welcome back Anubhav..' children='hello world'>
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create new Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Card style={{ margin: 10 }}>
          <Card.Header style={{ display: 'flex' }}>
            <span
              style={{
                flex: 1,
                color: 'black',
                textDecoration: 'none',
                alignSelf: 'center',
                fontSize: 20,
                cursor: 'pointer',
              }}
            >
              {note.title}
            </span>
            <div>
              <Link to={`/note/${note._id}`}>
                <Button>Edit</Button>
              </Link>
              <Button
                variant='danger'
                className='mx-2'
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <h4>
              {/* <Badge variant='success'>Category -{note.category}</Badge> */}
              <Button variant='success' style={{ borderRadius: 25 }}>
                Category - {note.category}
              </Button>
            </h4>
            <blockquote className='blockquote mb-0'>
              <p>{note.content}</p>
              <footer className='blockquote-footer'>Created on date</footer>
            </blockquote>
          </Card.Body>
        </Card>
      ))}
    </MainScreen>
  );
};

export default Notes;

// for flex : 1  - https://developer.mozilla.org/en-US/docs/Web/CSS/flex

// ! Badge now showing inside of Card, used Button instead.
// * Clicking on category button should filter out notes of same category -- add this feature later
