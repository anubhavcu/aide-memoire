import { useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './MainScreen.css';

const MainScreen = ({ title, children }) => {
  useEffect(() => {
    // console.log(children);
  });
  return (
    <div className='main-background'>
      <Container>
        <Col>
          <div
            className='form-check form-switch my-2 '
            style={{ position: 'absolute', right: '20vw' }}
          >
            <input
              className='form-check-input'
              type='checkbox'
              id='flexSwitchCheckChecked'
            />
            <label className='form-check-label' for='flexSwitchCheckChecked'>
              Dark Theme
            </label>
          </div>
          <Row>
            <div className='page'>
              {title && (
                <>
                  <h2 className='heading'>{title}</h2>
                  <hr />
                </>
              )}

              {children}
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default MainScreen;
