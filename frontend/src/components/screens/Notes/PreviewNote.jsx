import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

function PreviewNote(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.content.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4> {props.content.category}</h4>
        <ReactMarkdown>{props.content.content}</ReactMarkdown>
        {/* <p>{props.content.content}</p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default PreviewNote;
