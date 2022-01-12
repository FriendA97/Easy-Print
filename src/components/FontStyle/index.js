import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';
import { default as IconButtonMat } from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { SketchPicker } from 'react-color';
import Select from 'react-select';

const fontFamily = ['Noto Sans', 'Times New Roman', 'Arial'];
const fontSize = [8, 10, 12, 14, 16, 18, 20, 22, 24];

class FontStyle extends Component {
  state = {
    fontFamily: {
      value: 'Noto Sans',
      dropDownFontOpen: false,
    },
    fontSize: {
      value: 12,
      dropDownSizeOpen: false,
    },
    showColorPicker: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  selectFont = ({ value }) => {
    this.setState({
      ...this.state,
      fontFamily: {
        ...this.state.fontFamily,
        value,
      },
    });
    this.props.updateItem({
      ...this.props.item,
      fontFamily: value,
    });
  };

  selectSize = ({ value }) => {
    this.setState({
      ...this.state,
      fontSize: {
        ...this.state.fontSize,
        value: Number(value),
      },
    });
    this.props.updateItem({
      ...this.props.item,
      fontSize: Number(value),
    });
  };

  toggleFontstyle = (value) => {
    const { item, updateItem } = this.props;
    item && item.fontStyle
      ? item.fontStyle.includes(value)
        ? updateItem({
            ...item,
            fontStyle: item.fontStyle.replace(value, ''),
          })
        : updateItem({
            ...item,
            fontStyle: item.fontStyle + ' ' + value,
          })
      : updateItem({
          ...item,
          fontStyle: value,
        });
  };

  toggleUnderline = (value) => {
    const { item, updateItem } = this.props;
    item && item.textDecoration
      ? item.textDecoration.includes(value) &&
        updateItem({ ...item, textDecoration: '' })
      : updateItem({ ...item, textDecoration: value });
  };
  toggleColorPicker = () => {
    this.setState((prevState) => ({
      showColorPicker: !prevState.showColorPicker,
    }));
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        ...this.state,
        showColorPicker: false,
      });
    }
  };
  handleTextColorChange = (color) => {
    const { item, updateItem } = this.props;
    updateItem({
      ...item,
      color: color.hex,
    });
  };
  render() {
    let boldBtn, italicBtn, underlineBtn;
    if (this.props.item) {
      underlineBtn = classnames({
        'font__btn--active': this.props.item.textDecoration === 'underline',
      });
      boldBtn = classnames({
        'font__btn--active': this.props.item.fontStyle
          ? this.props.item.fontStyle.includes('bold')
          : false,
      });
      italicBtn = classnames({
        'font__btn--active': this.props.item.fontStyle
          ? this.props.item.fontStyle.includes('italic')
          : false,
      });
    }

    return (
      <div className="font__container">
        {/* <Col className="labelEditProps__items" md={10}> */}
        <Select
          className="font__fontFamily"
          value={
            this.props.item
              ? {
                  value: this.props.item.fontFamily,
                  label: this.props.item.fontFamily,
                }
              : { value: '', label: '' }
          }
          options={fontFamily.map((value) => ({ value, label: value }))}
          onChange={this.selectFont}
          isDisabled={this.props.isDisabled}
        />
        <Select
          className="font__fontSize"
          value={
            this.props.item
              ? {
                  value: this.props.item.fontSize,
                  label: this.props.item.fontSize,
                }
              : { value: '', label: '' }
          }
          options={fontSize.map((value) => ({ value, label: value }))}
          onChange={this.selectSize}
          isDisabled={this.props.isDisabled}
        />
        <div className={boldBtn}>
          <IconButtonMat
            onClick={() => this.toggleFontstyle('bold')}
            classes={{
              label: 'font__icon',
            }}
            disabled={this.props.isDisabled}
          >
            <FontAwesomeIcon icon="bold" />
          </IconButtonMat>
        </div>
        <div className={italicBtn}>
          <IconButtonMat
            onClick={() => this.toggleFontstyle('italic')}
            classes={{
              label: 'font__icon',
            }}
            disabled={this.props.isDisabled}
          >
            <FontAwesomeIcon icon="italic" />
          </IconButtonMat>
        </div>
        <div className={underlineBtn}>
          <IconButtonMat
            onClick={() => this.toggleUnderline('underline')}
            classes={{
              label: 'font__icon',
            }}
            disabled={this.props.isDisabled}
          >
            <FontAwesomeIcon icon="underline" />
          </IconButtonMat>
        </div>
        {/* <div className="labelEditProps__btn">
            <IconButtonMat
              onClick={this.toggleColorPicker}
              classes={{
                label: 'labelEditProps__icon',
              }}
            >
              <FontAwesomeIcon
                style={{
                  color: `${this.props.item ? this.props.item.color : 'black'}`,
                }}
                icon="paint-brush"
              />
            </IconButtonMat>
            {this.state.showColorPicker && (
              <div className="colorPicker" ref={e => this.setWrapperRef(e)}>
                <SketchPicker
                  color={this.props.item && this.props.item.color}
                  onChangeComplete={this.handleTextColorChange}
                />
              </div>
            )}
          </div> */}
        {/* </Col> */}
      </div>
    );
  }
}

FontStyle.propTypes = {
  item: PropTypes.object,
  updateItem: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default FontStyle;
