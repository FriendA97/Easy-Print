import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import TitleIcon from '@material-ui/icons/Title';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import { default as RectangleIcon } from '@material-ui/icons/Crop54';
import { default as Ellipse } from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import './styles.css';
import IconButton from '../../components/IconButton';
import actions, { selectors } from '../../redux/reducers/Layout';
import editorActions, {
  selectors as editorSelectors,
} from '../../redux/reducers/Editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import {
  ITEM_TEXT,
  ITEM_VARIABLE,
  ITEM_RECTANGLE,
  ITEM_ELLIPSE,
  ITEM_BARCODE,
  ITEM_IMAGE,
  ITEM_LINE,
  BARCODE_EAN13,
  BARCODE_QRCODE,
} from '../../mylib/Constants';

//For customzing material UI Icon
const icon = {
  root: {
    margin: '0.2rem 0.6rem 0.2rem 0',
  },
};

//Default props for items
export const defaultItems = {
  text: {
    itemType: ITEM_TEXT,
    text: 'Text',
    width: 50,
    height: 20,
    fontSize: 12,
    fontFamily: 'Noto Sans',
    customText: false,
    prompt: '',
    rotation: 0,
  },
  variable: {
    itemType: ITEM_VARIABLE,
    varCode: '',
    width: 100,
    height: 20,
    x: 70,
    y: 10,
    fontSize: 12,
    rotation: 0,
    fontFamily: 'Noto Sans',
  },
  rect: {
    itemType: ITEM_RECTANGLE,
    width: 30,
    height: 30,
    x: 70,
    y: 60,
  },
  barcode: {
    itemType: ITEM_BARCODE,
    varCode: '',
    type: BARCODE_EAN13,
    width: 120,
    height: 50,
    image: '',
  },
  ellipse: {
    itemType: ITEM_ELLIPSE,
    width: 20,
    height: 15,
    radiusX: 30,
    radiusY: 30,
    x: 45,
    y: 40,
    color: 'white',
  },
  line: {
    itemType: ITEM_LINE,
    width: 100,
    height: 0,
    x: 30,
    y: 30,
    x0: 10,
    y0: 40,
    x1: 50,
    y1: 40,
    x2: 100,
    y2: 40,
    strokeWidth: 4,
  },
  QRcode: {
    itemType: ITEM_BARCODE,
    varCode: '',
    type: BARCODE_QRCODE,
    width: 50,
    height: 50,
  },
  image: {
    itemType: ITEM_IMAGE,
    image: '',
    width: 70,
    height: 70,
    x: 50,
    y: 50,
    rotation: 0,
  },
};

class Toolbar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.move !== nextProps.move) {
      return true;
    }
    return false;
  }

  moveItems = () => {
    this.props.updateMoveItem(!this.props.move);
  };

  clearAllItems = () => {
    this.props.resetLayout();
  };

  addItem(item) {
    const n = this.props.items.length;
    const newItem = {
      ...item,
      x: 30 + ((10 * n) % 50),
      y: 30 + ((10 * n) % 50),
      id: this.props.items.length,
    };

    this.props.createItem(newItem);
    this.props.selectItem(newItem.id);
  }

  displayText = () => {
    this.addItem(defaultItems.text);
  };

  displayRect = () => {
    this.addItem(defaultItems.rect);
  };

  displayBarcode = () => {
    this.addItem(defaultItems.barcode);
  };

  displayEllipse = () => {
    this.addItem(defaultItems.ellipse);
  };

  displayLine = () => {
    this.addItem(defaultItems.line);
  };

  displayVariable = () => {
    this.addItem(defaultItems.variable);
  };

  displayQRCode = () => {
    this.addItem(defaultItems.QRcode);
  };

  displayImage = (files) => {
    this.addItem({ ...defaultItems.image, image: files.base64 });
  };

  drag = (ev) => {
    ev.dataTransfer.setData('text', String(ev.target.id).replace('item_', ''));
  };

  render() {
    const { t, classes } = this.props;
    return (
      <Navbar className="toolbar__container">
        <Nav className="toolbar__items" vertical>
          <p className="toolbar__createItemTitle margin-0">
            {t('fn.newItem', 'New Item')}
          </p>
          <NavItem className="toolbar__item">
            <Button
              className="btn__container btn__container--toolbar"
              color="primary"
              onClick={this.displayText}
              draggable={true}
              id={'item_text'}
              onDragStart={this.drag}
            >
              <TitleIcon className={classes.root} />
              {t('lbl.text', 'Text')}
            </Button>
          </NavItem>
          <NavItem className="toolbar__item">
            <Button
              className="btn__container btn__container--toolbar"
              color="primary"
              onClick={this.displayVariable}
              draggable={true}
              id={'item_variable'}
              onDragStart={this.drag}
            >
              <TextFieldsIcon className={classes.root} />
              {t('lbl.variable', 'Variable')}
            </Button>
          </NavItem>
          <NavItem className="toolbar__item">
            <ReactFileReader
              fileTypes={['.png', '.jpg', '.jpeg', '.gif']}
              base64={true}
              handleFiles={this.displayImage}
            >
              <Button
                className="btn__container btn__container--toolbar"
                color="primary"
              >
                <ImageIcon className={classes.root} />
                {t('lbl.picture', 'Picture')}
              </Button>
            </ReactFileReader>
          </NavItem>
          <NavItem className="toolbar__item">
            <IconButton
              icon="barcode"
              text={t('lbl.barcode', 'Barcode')}
              iconSize="1x"
              color="primary"
              onClick={this.displayBarcode}
              draggable={true}
              id={'item_barcode'}
              onDragStart={this.drag}
            />
          </NavItem>
          <NavItem className="toolbar__item">
            <IconButton
              icon="qrcode"
              text={t('lbl.qrCode', 'QR Code')}
              iconSize="1x"
              color="primary"
              onClick={this.displayQRCode}
              draggable={true}
              id={'item_QRcode'}
              onDragStart={this.drag}
            />
          </NavItem>
          <NavItem className="toolbar__item">
            <IconButton
              icon="minus"
              text={t('lbl.line', 'Line')}
              iconSize="1x"
              color="primary"
              onClick={this.displayLine}
              draggable={true}
              id={'item_line'}
              onDragStart={this.drag}
            />
          </NavItem>
          <NavItem className="toolbar__item">
            <Button
              className="btn__container btn__container--toolbar"
              color="primary"
              onClick={this.displayRect}
              draggable={true}
              id={'item_rect'}
              onDragStart={this.drag}
            >
              <RectangleIcon className={classes.root} />
              {t('opt.harmonies.3', 'Rectangle')}
            </Button>
          </NavItem>
          <NavItem className="toolbar__item">
            <Button
              className="btn__container btn__container--toolbar"
              color="primary"
              onClick={this.displayEllipse}
              draggable={true}
              id={'item_ellipse'}
              onDragStart={this.drag}
            >
              <Ellipse className={classes.root} />
              {t('lbl.ellipse', 'Ellipse')}
            </Button>
          </NavItem>
          <NavItem className="toolbar__item">
            <Button
              className="btn__container btn__container--toolbar btn__toolbar--clear"
              color="danger"
              onClick={this.clearAllItems}
            >
              <ClearIcon className={classes.root} />
              {t('fn.clearAll', 'Clear All')}
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Toolbar.propTypes = {
  t: PropTypes.func.isRequired,
  layout: PropTypes.object,
  items: PropTypes.array,
  createItem: PropTypes.func,
  selectItem: PropTypes.func,
  resetLayout: PropTypes.func,
  updateMoveItem: PropTypes.func,
  classes: PropTypes.object,
  showAlignment: PropTypes.bool,
  showEdit: PropTypes.bool,
  resetUI: PropTypes.func,
  move: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    items: selectors.itemsAsArray(state),
    layout: state.layout,
    selectedItemId: editorSelectors.selectedItemId(state),
    move: editorSelectors.move(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createItem: actions.createItem,
      updateItem: actions.updateItem,
      deleteItem: actions.deleteItem,
      moveItem: actions.moveItem,
      updateMoveItem: editorActions.updateMoveItem,
      resetLayout: actions.resetLayout,
      selectItem: editorActions.selectItem,
    },
    dispatch
  );
}

export default withTranslation('translations')(
  withStyles(icon)(connect(mapStateToProps, mapDispatchToProps)(Toolbar))
);
