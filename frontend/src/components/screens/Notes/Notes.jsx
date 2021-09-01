import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../MainScreen';

const Notes = () => {
  return (
    <MainScreen title='Welcome back Anubhav..' children='hello world'>
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create new Note
        </Button>
      </Link>
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
            title
          </span>
          <div>
            <Button>Edit</Button>
            <Button variant='danger' className='mx-2'>
              Delete
            </Button>
          </div>
        </Card.Header>
      </Card>
    </MainScreen>
  );
};

export default Notes;

// for flex : 1  - https://developer.mozilla.org/en-US/docs/Web/CSS/flex
