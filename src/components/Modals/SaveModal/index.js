import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
} from 'reactstrap';
import './styles.css';
import { download } from '../../../containers/Utils';
const SaveModal = (props) => {
  const {
    showSaveModal,
    toggleSaveModal,
    fileName,
    handleFileNameChange,
    saveType,
    handleSaveDB,
  } = props;
  const save = (type) => {
    if (type === 'PC') {
      download(fileName, props.layout);
      toggleSaveModal();
    } else {
      handleSaveDB(fileName, props.layout);
      toggleSaveModal();
    }
  };
  return (
    <Modal isOpen={showSaveModal}>
      <ModalHeader>
        {saveType === 'PC' ? 'Enter file name' : 'Enter label name'}
      </ModalHeader>
      <ModalBody>
        <Input
          value={fileName}
          onChange={(e) => handleFileNameChange(e)}
          className="saveModal__input"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => save(saveType)}>
          Save
        </Button>
        <Button onClick={toggleSaveModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

SaveModal.propTypes = {
  showSaveModal: PropTypes.bool,
  toggleSaveModal: PropTypes.func,
  fileName: PropTypes.string,
  handleFileNameChange: PropTypes.func,
  saveToPC: PropTypes.func,
};

export default SaveModal;
