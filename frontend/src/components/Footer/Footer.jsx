import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
const Footer = () => {
  return (
    <footer className='bg-light'>
      <Container>
        <Row>
          {/* <Col className='text-center py-3 text-dark'>
            Copyright &copy; AideMemoire
          </Col>
          <Col className='text-center py-3 '>
            <h3>
              <i className='fab fa-linkedin'></i>
            </h3>

          </Col> */}
          <Col className='ms-auto text-center py-4  '>
            <span className='fw-bold'>Copyright &copy; aideMemoire</span>
          </Col>
          <Col className='ms-auto '>
            <div className='text-center py-3'>
              <span className='fst-italic fw-bold'>Connect with me :</span>
              <SocialIcon
                url='https://www.linkedin.com/in/anubhavksr/'
                className='mx-2 customHover'
                target='_blank'
                fgColor='#fff'
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url='https://github.com/anubhavcu'
                className='mx-2 customHover'
                target='_blank'
                fgColor='#fff'
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url='https://twitter.com/anubhav_sr'
                className='mx-2 customHover'
                target='_blank'
                fgColor='#fff'
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url='mailto:anubhavcs.py@gmail.com'
                className='mx-2 customHover'
                target='_blank'
                fgColor='#fff'
                style={{ height: 35, width: 35 }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
