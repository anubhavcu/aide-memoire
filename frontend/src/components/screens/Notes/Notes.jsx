import { Accordion, Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../MainScreen';
import { useState, useEffect } from 'react';
import Search from '../../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { listNotes } from '../../../redux/actions/notesActions';
import ErrorMessage from '../../ErrorMessage';
import PreviewNote from './PreviewNote';

const Notes = ({ history }) => {
  // state for modal
  const [modalShow, setModalShow] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState(null);

  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notesList);

  const { loading, notes, error } = notesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo === null) {
      history.push('/');
    } else {
      dispatch(listNotes());
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
    }
  };
  return (
    <MainScreen title={`Welcome back ${userInfo && userInfo.name}..`}>
      <Search />
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          <i className='fas fa-plus'></i> Add Note
        </Button>
      </Link>
      {error && <ErrorMessage variant='danger' text={error}></ErrorMessage>}
      {loading && (
        <div className=' d-flex justify-content-center align-items-center'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}
      {notes.map((note) => (
        <Accordion key={note._id}>
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
                <Accordion.Toggle as={Card.Text} eventKey='0' variant='link'>
                  {note.title}
                </Accordion.Toggle>
              </span>
              <div>
                <Button
                  variant='success'
                  className='mx-2'
                  onClick={() => {
                    setActiveModalContent(note);
                    setModalShow(true);
                  }}
                >
                  Preview
                </Button>

                <PreviewNote
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  content={activeModalContent}
                />

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
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <h4>
                  {/* <Badge variant='success'>Category -{note.category}</Badge> */}
                  <Badge className='badge bg-success'>
                    {/* <span className='badge bg-info'> */}
                    Category -{note.category}
                    {/* </span> */}
                  </Badge>
                </h4>
                <blockquote className='blockquote mb-0'>
                  <p>{note.content}</p>
                  <footer className='blockquote-footer'>
                    {/* Date created: {note.createdAt.substring(0, 10)} || */}
                    Last modified: {note.updatedAt.substring(0, 10)}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default Notes;

// for flex : 1  - https://developer.mozilla.org/en-US/docs/Web/CSS/flex

// ! Badge now showing inside of Card, used Button instead.
// * Clicking on category button should filter out notes of same category -- add this feature later
