import React, { Component, forwardRef } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions, {
  selectors as layoutSelectors,
} from '../../redux/reducers/Layout';
import editorActions, {
  selectors as editorSelectors,
} from '../../redux/reducers/Editor';
import { Row, Col } from 'reactstrap';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { default as IconButtonMat } from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import LabelEditor from '../../components/LabelEditor';
import Editor from '../../components/Editor';
import Preview from '../../components/Preview';
import LabelItemsSettings from '../../components/labelItemsSettings';
import { actions as undoActions } from 'redux-undo-redo';
import { withTranslation } from 'react-i18next';
import Select from 'react-select';
import TypeSettings from '../../components/labelItemsSettings/typeSettings';
import { dragBoundItem } from '../Utils.js';

const useStyles = {
  root: {
    padding: '10px',
  },
};

class Layout extends Component {
  customStrokeWidth = (e) => {
    const item = { ...this.props.item, strokeWidth: Number(e.value) };
    this.props.updateItem(item);
  };
  customCornerCurve = (e) => {
    const item = { ...this.props.item, cornerRadius: Number(e.value) };
    this.props.updateItem(item);
  };
  rotationSnaps = (e) => {
    const num = Number(e.value);
    const pos = { x: this.props.item.x, y: this.props.item.y };
    const { x, y } = dragBoundItem(
      pos,
      this.props.layout,
      this.props.item,
      num
    );
    if (!isNaN(num)) {
      const item = { ...this.props.item, rotation: num, x, y };
      this.props.updateItem(item);
    }
  };
  writeText = (e) => {
    const item = { ...this.props.item, text: e.target.value };
    this.props.updateItem(item);
  };
  customText = (e) => {
    let nextCustomText, nextTextValue;
    if (this.props.item) {
      nextCustomText = !this.props.item.customText;
      nextCustomText
        ? (nextTextValue = 'Enter prompt')
        : (nextTextValue = 'Text');
    }

    this.props.updateItem({
      ...this.props.item,
      customText: nextCustomText,
      text: nextCustomText ? '' : nextTextValue,
      prompt: nextCustomText ? nextTextValue : '',
    });
  };

  writePrompt = (e) => {
    const item = { ...this.props.item, prompt: e.target.value };
    this.props.updateItem(item);
  };

  customVariableGroup = (e) => {
    const { variableGroup } = this.props;
    const value = variableGroup.find((el) => el.label === e.value).variables[0];
    const item = { ...this.props.item, varCode: value.code };
    this.props.updateItem(item);
  };
  customVariable = (e) => {
    const item = { ...this.props.item, varCode: e.value };
    this.props.updateItem(item);
  };
  customBarcodeGroup = (e) => {
    const { barcodeVariables } = this.props;
    const value = barcodeVariables.find((el) => el.label === e.value)
      .variables[0];
    const item = { ...this.props.item, varCode: value.code };
    this.props.updateItem(item);
  };
  customBarcode = (e) => {
    const item = { ...this.props.item, varCode: e.value };
    this.props.updateItem(item);
  };
  customBarcodeType = (e) => {
    const item = { ...this.props.item, type: e.value };
    this.props.updateItem(item);
  };
  handleActiveItemChange = ({ id }) => {
    this.props.selectItem(id);
  };
  render() {
    const {
      t,
      item,
      items,
      updateItem,
      moveItemBottom,
      moveItemDown,
      moveItemTop,
      moveItemUp,
      layout,
      classes,
      selectItem,
      selectedItemId,
      onUndo,
      onRedo,
      stageForwardedRef,
      variableGroup,
      orderItem,
      formatters,
      barcodeVariables,
      move,
      deleteItem,
      createItem,
    } = this.props;

    // map variable codes to info objects
    const codeToInfo = {};
    for (let category of [variableGroup, barcodeVariables]) {
      for (let group of category) {
        for (let variable of group.variables)
          codeToInfo[variable.code] = variable;
      }
    }

    return (
      <React.Fragment>
        <Row className="layout__container">
          <Col style={{ paddingLeft: 0 }}>
            <Row
              className="mr-8 ml-8"
              style={{ height: '4rem', marginBottom: '0.5rem' }}
            >
              <Col xs={3} style={{ padding: 0, maxWidth: '150px' }}>
                <p className="currentItem__title margin-0">
                  {t('lbl.activeItem', 'Active Item')}
                </p>
                <Select
                  isDisabled={items.length === 0 || false}
                  value={
                    item
                      ? { id: item.id, value: item.name, label: item.name }
                      : { value: null, label: 'None' }
                  }
                  options={
                    items
                      ? items.map((item) => ({
                          id: item.id,
                          value: item.name,
                          label: item.name,
                        }))
                      : null
                  }
                  onChange={this.handleActiveItemChange}
                />
              </Col>
              <TypeSettings
                variableGroup={variableGroup}
                barcodeVariables={barcodeVariables}
                item={item}
                rotationSnaps={this.rotationSnaps}
                writeText={this.writeText}
                writePrompt={this.writePrompt}
                customText={this.customText}
                toggleCustomText={item ? item.customText : false}
                customStrokeWidth={this.customStrokeWidth}
                customCornerCurve={this.customCornerCurve}
                customVariableGroup={this.customVariableGroup}
                customVariable={this.customVariable}
                customBarcode={this.customBarcode}
                customBarcodeType={this.customBarcodeType}
                customBarcodeGroup={this.customBarcodeGroup}
                codeToInfo={codeToInfo}
              />
            </Row>
            <Row className="ml-8 mr-8">
              <LabelEditor
                item={item}
                updateItem={updateItem}
                moveItemBottom={moveItemBottom}
                moveItemDown={moveItemDown}
                moveItemTop={moveItemTop}
                moveItemUp={moveItemUp}
              />
            </Row>
            <Row className="main__container">
              <Col md={9} className="main__col">
                <Row className="main__edit">
                  <Col
                    md={2}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      padding: 0,
                    }}
                  >
                    <p className="margin-0">{t('lbl.editor', 'Editor')}</p>
                    <div className="main__btns">
                      <IconButtonMat
                        onClick={onUndo}
                        className={classes.root}
                        title="Undo"
                      >
                        <UndoIcon />
                      </IconButtonMat>
                      <IconButtonMat
                        onClick={onRedo}
                        className={classes.root}
                        title="Redo"
                      >
                        <RedoIcon />
                      </IconButtonMat>
                    </div>
                    <IconButtonMat
                      onClick={this.props.toggleShowPreview}
                      className={classes.root}
                      title="Preview"
                      style={{
                        color: this.props.showPreview ? 'white' : 'unset',
                        backgroundColor: this.props.showPreview
                          ? '#458DD5'
                          : 'unset',
                      }}
                    >
                      <VisibilityIcon />
                    </IconButtonMat>
                  </Col>
                  <Col md={10}>
                    {!this.props.showPreview ? (
                      <Editor
                        currentItem={item}
                        items={items}
                        layout={layout}
                        createItem={createItem}
                        selectItem={selectItem}
                        updateItem={updateItem}
                        selectedItemId={selectedItemId}
                        codeToInfo={codeToInfo}
                        move={move}
                        deleteItem={deleteItem}
                      />
                    ) : (
                      <Preview
                        ref={stageForwardedRef}
                        layout={layout}
                        selectItem={selectItem}
                        updateItem={updateItem}
                        selectedItemId={selectedItemId}
                        orderItem={orderItem}
                        formatters={formatters}
                        move={move}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col className="labelSettings__container" md={3}>
                <LabelItemsSettings
                  item={item}
                  updateItem={updateItem}
                  layout={layout}
                  variableGroup={variableGroup}
                  barcodeVariables={barcodeVariables}
                  codeToInfo={codeToInfo}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  t: PropTypes.func.isRequired,
  item: PropTypes.object,
  layout: PropTypes.object,
  items: PropTypes.array,
  showAlignment: PropTypes.bool,
  showEdit: PropTypes.bool,
  selectItem: PropTypes.func,
  deleteItem: PropTypes.func,
  stageForwardedRef: PropTypes.object,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  updateItem: PropTypes.func,
  moveItemDown: PropTypes.func,
  moveItemUp: PropTypes.func,
  moveItemTop: PropTypes.func,
  moveItemBottom: PropTypes.func,
  selectedItemId: PropTypes.number,
  variableGroup: PropTypes.array,
  classes: PropTypes.object,
  orderItem: PropTypes.object,
  formatters: PropTypes.object,
  barcodeVariables: PropTypes.array,
  move: PropTypes.bool,
  showPreview: PropTypes.bool,
  toggleShowPreview: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    canUndo: state.undoHistory.undoQueue.length > 0,
    canRedo: state.undoHistory.redoQueue.length > 0,
    item: layoutSelectors.itemById(
      state,
      editorSelectors.selectedItemId(state)
    ),
    uploads: layoutSelectors.itemsAsArray(state),
    layout: state.layout,
    items: layoutSelectors.itemsAsArray(state),
    selectedItemId: editorSelectors.selectedItemId(state),
    move: editorSelectors.move(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onUndo: undoActions.undo,
      onRedo: undoActions.redo,
      createItem: actions.createItem,
      updateItem: actions.updateItem,
      deleteItem: actions.deleteItem,
      moveItem: actions.moveItem,
      updatePage: actions.updatePage,
      updateReadOnly: actions.updateReadOnly,
      updateMoveItem: editorActions.updateMoveItem,
      resetLayout: actions.resetLayout,
      selectItem: editorActions.selectItem,
      moveItemUp: actions.moveItemUp,
      moveItemDown: actions.moveItemDown,
      moveItemTop: actions.moveItemTop,
      moveItemBottom: actions.moveItemBottom,
    },
    dispatch
  );
}

const ConnectedLayout = withStyles(useStyles)(
  withTranslation('translations')(
    connect(mapStateToProps, mapDispatchToProps)(Layout)
  )
);

// eslint-disable-next-line react/display-name
const FinalLayout = forwardRef(function finalLayout(props, ref) {
  return <ConnectedLayout {...props} stageForwardedRef={ref} />;
});

export default FinalLayout;
