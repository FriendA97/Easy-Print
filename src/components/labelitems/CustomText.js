import React, { Fragment } from 'react';
import { Text } from 'react-konva';
import { connect } from 'react-redux';
import editorActions, {
  selectors as editorSelectors,
} from 'js/redux/reducers/Editor';
import layoutActions from 'js/redux/reducers/Layout';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import AddTransformer from './Transformer';

class CustomText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
    };

    this.area = React.createRef();
    this.trRef = React.createRef();
  }

  render() {
    const { item } = this.props;
    const name = 'customText' + item.id;
    const isSelected = item.id === this.props.selectedItemId;

    return (
      <React.Fragment>
        <Text
          text={item.text}
          ref={this.area}
          x={52}
          y={282}
          width={item.width}
          height={item.height}
          draggable={true}
          fontSize={item.fontSize}
          name={name}
          fontFamily={item.fontFamily}
          onClick={
            this.props.readonly ? null : () => this.props.selectItem(item.id)
          }
        />
        {this.props.readonly ? null : (
          <AddTransformer
            ref={this.trRef}
            selectedShapeName={isSelected ? name : null}
          />
        )}
      </React.Fragment>
    );
  }
}

CustomText.propTypes = {
  readonly: PropTypes.bool,
  item: PropTypes.object,
  selectedItemId: PropTypes.number,
  selectItem: PropTypes.func,
  updateItem: PropTypes.func.isRequired,
  move: PropTypes.bool,
  layout: PropTypes.object,
};

CustomText.defaultProps = {
  readonly: false,
};

function mapStateToProps(state) {
  return {
    //items: selectors.itemsAsArray(state)
    selectedItemId: editorSelectors.selectedItemId(state),
    layout: state.layout,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectItem: editorActions.selectItem,
      updateItem: layoutActions.updateItem,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomText);
