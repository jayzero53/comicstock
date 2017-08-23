import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { confirmable } from 'react-confirm';

class Confirmation extends React.Component {
  render() {
    const {
      okLabel = 'OK',
      cancelLabel = 'Cancel',
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
    } = this.props;

    return (
      <div className="static-modal">
        <Modal
          show={show}
          onHide={dismiss}
          backdrop={enableEscape ? true : 'static'}
          keyboard={enableEscape}
        >
          <Modal.Header>
            <Modal.Title>
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirmation}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={cancel}>
              {cancelLabel}
            </Button>
            <Button className="button-l" bsStyle="primary" onClick={proceed}>
              {okLabel}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
Confirmation.propTypes = {
  okLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  confirmation: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  proceed: PropTypes.func.isRequired, // called when ok button is clicked.
  cancel: PropTypes.func.isRequired, // called when cancel button is clicked.
  dismiss: PropTypes.func.isRequired, // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool.isRequired,
};
export default confirmable(Confirmation);
