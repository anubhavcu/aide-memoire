import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = 'info', text }) => {
  return (
    <div>
      <Alert variant={variant} style={{ fontSize: 20 }}>
        <strong>{text}</strong>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
