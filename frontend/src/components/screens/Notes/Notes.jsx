import { Button } from 'react-bootstrap';
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
    </MainScreen>
  );
};

export default Notes;
