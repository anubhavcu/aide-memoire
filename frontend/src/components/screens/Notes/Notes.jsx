import { Accordion, Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../MainScreen';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listNotes,
  notesDeleteAction,
} from '../../../redux/actions/notesActions';
import ErrorMessage from '../../ErrorMessage';
import PreviewNote from './PreviewNote';
import ReactMarkdown from 'react-markdown';

const Notes = ({ history, search }) => {
  // state for modal
  const [modalShow, setModalShow] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState('');

  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notesList);

  const { loading, notes, error } = notesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // fetching createNote and noteUpdate states and check if something's changed, if so
  // notes page will re-render(useEffect's dependency list) , so as to show any latest changes/additions
  const createNote = useSelector((state) => state.createNote);
  const { success: successCreate } = createNote;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;
  useEffect(() => {
    if (!userInfo || userInfo === null) {
      history.push('/');
    } else {
      dispatch(listNotes());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(notesDeleteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome back ${userInfo && userInfo.name}..`}>
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          <i className='fas fa-plus'></i> Add Note
        </Button>
      </Link>
      {/* {successUpdate && (
        <ErrorMessage
          variant='success'
          text={'Note Updated Successfully!'}
        ></ErrorMessage>
      )}
      {successCreate && (
        <ErrorMessage
          variant='success'
          text='Note Created Successfully'
        ></ErrorMessage>
      )}
      {successDelete && (
        <ErrorMessage
          variant='success'
          text='Note Deleted Successfully'
        ></ErrorMessage>
      )}
      */}
      {errorDelete && (
        <ErrorMessage variant='danger' text={error}></ErrorMessage>
      )}
      {error && <ErrorMessage variant='danger' text={error}></ErrorMessage>}
      {loading && (
        <div className=' d-flex justify-content-center align-items-center'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      )}
      {/* slice.reverse is basically to show latest note first  */}
      {notes &&
        notes
          .slice(0)
          .reverse()
          .filter(
            (filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase()) ||
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note, index, arr) => (
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
                    <Accordion.Toggle
                      as={Card.Text}
                      eventKey='0'
                      variant='link'
                    >
                      {/* <i className='fas fa-arrow-circle-right ms-2'></i>{' '} */}
                      <strong>{arr.length - index}. </strong> {note.title}
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
                      <i className='fas fa-eye'></i> Preview
                    </Button>

                    <PreviewNote
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      content={activeModalContent}
                    />

                    <Link to={`/notes/${note._id}`}>
                      <Button>
                        <i className='fas fa-pen'></i>
                        {'  '} Edit
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='mx-2'
                      onClick={() => handleDelete(note._id)}
                    >
                      <i className='fas fa-trash-alt'></i>
                      {'   '} Delete
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
                      <ReactMarkdown>{note.content}</ReactMarkdown>
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
