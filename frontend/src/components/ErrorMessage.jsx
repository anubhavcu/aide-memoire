import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = 'info', text }) => {
  //   const [visible, setVisible] = useState(true);
  //   useEffect(() => {
  //     console.log('before', visible);
  //     setTimeout(() => {
  //       setVisible(false);
  //       console.log('after ', visible);
  //     }, 2000);
  //   }, []);
  return (
    <div>
      {/* {visible && ( */}
      <Alert variant={variant} style={{ fontSize: 20 }}>
        <strong>{text}</strong>
      </Alert>
      {/* )} */}
    </div>
  );
};

export default ErrorMessage;
