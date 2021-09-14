import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = 'info', text }) => {
  // const [visible, setVisible] = useState(false);
  // const componentWillUnmount = useRef(false);
  // useEffect(() => {
  //   setVisible(true);
  //   window.setTimeout(() => {
  //     setVisible(false);
  //   }, 2000);
  //   return () => {
  //     componentWillUnmount.current = true;
  //   };
  // }, []);
  return (
    <div>
      <Alert
        variant={variant}
        style={{ fontSize: 20 }}
        // show={visible}
      >
        <strong>{text}</strong>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
