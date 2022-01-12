import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Spinner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon="spinner" spin />
      </React.Fragment>
    );
  }
}
