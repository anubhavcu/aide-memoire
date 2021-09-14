import { Container, Row, Col } from 'react-bootstrap';
import './MainScreen.css';
import { useDispatch } from 'react-redux';

const MainScreen = ({ title, children }) => {
  const dispatch = useDispatch();

  const handleChange = () => {
    const value = document.getElementById('flexSwitchCheckChecked').checked;
    console.log(value);
    dispatch({ type: 'THEME_SWITCHED', payload: value });
  };

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
              // onChangeCapture={(e) => handleChange(e.target.value)}
              onChange={handleChange}
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
