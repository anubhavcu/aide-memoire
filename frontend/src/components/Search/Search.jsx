import { Container, Form } from 'react-bootstrap';

const Search = ({ setSearch }) => {
  return (
    <Container>
      <Form>
        {/* <Form.Group className='my-3' controlId='formBasicEmail'> */}
        <Form.Group
          className='mx-5 my-2'
          style={{ width: '75%' }}
          controlId='formBasicEmail'
        >
          <Form.Control
            type='text'
            // size='sm'
            placeholder='Search '
            style={{ borderRadius: '25px' }}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* <Form.Text className='text-muted'>Search as you type...</Form.Text> */}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Search;
