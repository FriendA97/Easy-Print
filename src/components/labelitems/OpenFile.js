import React from 'react';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import { selectors as editorSelectors } from 'js/redux/reducers/Editor';
import { bindActionCreators } from 'redux';
import layoutActions from 'js/redux/reducers/Layout';
import { Row } from 'reactstrap';

class OpenFile extends React.Component {
  handleFiles = (files) => {
    let file = files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = this.updateLayout.bind(this);
    reader.readAsText(file);
  };

  updateLayout(e) {
    var contents = e.target.result;

    this.props.load(JSON.parse(contents));
  }

  render() {
    return (
      <ReactFileReader fileTypes={['.json']} handleFiles={this.handleFiles}>
        <React.Fragment>
          <button className="btn" color="primary" title="Browse PC"></button>
          <Row>
            <label
              style={{
                fontSize: '1rem',
                marginLeft: '1rem',
                marginTop: '-1rem',
              }}
            >
              Browse PC
            </label>
          </Row>
        </React.Fragment>
      </ReactFileReader>
    );
  }
}
OpenFile.propTypes = {
  load: PropTypes.func.isRequired,
};

OpenFile.defaultProps = {};

function mapStateToProps(state) {
  return {
    //items: selectors.itemsAsArray(state)
    selectedItemId: editorSelectors.selectedItemId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      load: layoutActions.load,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenFile);
