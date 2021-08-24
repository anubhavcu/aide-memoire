import { Container, Form } from 'react-bootstrap';

const Search = () => {
  return (
    <Container>
      <Form>
        <Form.Group className='my-3' controlId='formBasicEmail'>
          <Form.Control
            type='text'
            size='lg'
            placeholder='Search your notes...'
            style={{ borderRadius: '25px' }}
          />

          {/* <Form.Text className='text-muted'>Search as you type...</Form.Text> */}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Search;
