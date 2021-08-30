import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer className='bg-dark text-white fixed-bottom'>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; AideMemoire</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
