import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions, {
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
} from '../../redux/reducers/Layout';
import CustomInput from '../CustomInput';
import { mmToPixel, pixelToMm } from '../../containers/Utils';
import { default as IconButtonMat } from '@material-ui/core/IconButton';
import LandscapeIcon from '@material-ui/icons/Landscape';
import PortraitIcon from '@material-ui/icons/Portrait';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { Row, Col } from 'reactstrap';

const useStyles = {
  root: {
    padding: '6px',
    borderRadius: '10%',
    border: (props) => (props.orientation ? '2px solid #458DD5' : 'none'),
    backgroundColor: (props) => (props.orientation ? '#458DD5' : 'unset'),
    '&:hover': {
      backgroundColor: '#458DD5',
    },
    '& span': {
      color: 'white',
    },
  },
};

const IconButtonMatRaw = (props) => {
  const { classes, orientation, children, ...others } = props;
  return (
    <IconButtonMat
      orientation="orientation"
      className={classes.root}
      {...others}
    >
      {children}
    </IconButtonMat>
  );
};

IconButtonMatRaw.propTypes = {
  classes: PropTypes.object,
  orientation: PropTypes.bool,
  children: PropTypes.node,
};

const IconButtonMatCustom = withStyles(useStyles)(IconButtonMatRaw);

class PageSettings extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      width,
      height,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      orientation,
    } = this.props.layout;
    if (
      width !== nextProps.layout.width ||
      height !== nextProps.layout.height ||
      marginTop !== nextProps.layout.marginTop ||
      marginBottom !== nextProps.layout.marginBottom ||
      marginLeft !== nextProps.layout.marginLeft ||
      marginRight !== nextProps.layout.marginRight ||
      orientation !== nextProps.layout.orientation
    ) {
      return true;
    }
    return false;
  }
  customWidth = (e) => {
    let num = Number(e.target.value);
    if (!isNaN(num)) {
      num = { pixel: mmToPixel(num), mm: num };
      const value = { ...this.props.layout, width: num };
      this.props.updatePage(value);
    }
  };

  customHeight = (e) => {
    let num = Number(e.target.value);
    if (!isNaN(num)) {
      num = { pixel: mmToPixel(num), mm: num };
      const value = { ...this.props.layout, height: num };
      this.props.updatePage(value);
    }
  };

  customMarginTop = (e) => {
    let num = Number(e.target.value);
    if (!isNaN(num)) {
      num = mmToPixel(num);
      const value = { ...this.props.layout, marginTop: num };
      this.props.updatePage(value);
    }
  };

  customMarginBottom = (e) => {
    let num = Number(e.target.value);
    if (!isNaN(num)) {
      num = mmToPixel(num);
      const value = { ...this.props.layout.width, marginBottom: num };
      this.props.updatePage(value);
    }
  };

  customMarginLeft = (e) => {
    let num = Number(e.target.value);
    if (!isNaN(num)) {
      num = mmToPixel(num);
      const value = { ...this.props.layout.width, marginLeft: num };
      this.props.updatePage(value);
    }
  };

  customMarginRight = (e) => {
    let num = Number(e.target.value);
    if (!isNaN(num)) {
      num = mmToPixel(num);
      const value = { ...this.props.layout.width, marginRight: num };
      this.props.updatePage(value);
    }
  };

  setOrientation = (value) => {
    switch (value) {
      case ORIENTATION_LANDSCAPE:
        this.props.setOrientation(ORIENTATION_LANDSCAPE);
        break;
      case ORIENTATION_PORTRAIT:
        this.props.setOrientation(ORIENTATION_PORTRAIT);
        break;
      default:
        break;
    }
  };

  render() {
    const { t, classes } = this.props;
    const {
      width,
      height,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    } = this.props.layout;
    return (
      <React.Fragment>
        <p className="pageSettings__title margin-0">
          {t('lbl.pageSettings', 'Page settings')}
        </p>
        <div className="pageSettings__items">
          <div className="pageSettings__size">
            <div>
              <p className="margin-0">{t('lbl.sizes.colon', 'Sizes:')}</p>
              <CustomInput
                type="number"
                min="0"
                value={
                  pixelToMm(width.pixel) === 0 ? '' : pixelToMm(width.pixel)
                }
                labelText={`${t('lbl.width', 'Width')} [mm]`}
                onChange={this.customWidth}
                plainText
              />
              <CustomInput
                type="number"
                min="0"
                value={
                  pixelToMm(height.pixel) === 0 ? '' : pixelToMm(height.pixel)
                }
                labelText={`${t('lbl.height', 'Height')} [mm]`}
                onChange={this.customHeight}
                plainText
              />
            </div>
          </div>
          <div className="pageSettings__margin">
            <p className="margin-0">{t('lbl.margins.colon', 'Margins:')}</p>
            <div>
              <div>
                <CustomInput
                  type="number"
                  min="0"
                  value={pixelToMm(marginTop) === 0 ? '' : pixelToMm(marginTop)}
                  placeholder={0}
                  labelText={`${t('lbl.topMargin', 'Top')} [mm]`}
                  onChange={this.customMarginTop}
                  plainText
                />
                <CustomInput
                  type="number"
                  min="0"
                  placeholder={0}
                  value={
                    pixelToMm(marginLeft) === 0 ? '' : pixelToMm(marginLeft)
                  }
                  labelText={`${t('lbl.leftMargin', 'Left')} [mm]`}
                  onChange={this.customMarginLeft}
                  plainText
                />
              </div>
              <div>
                <CustomInput
                  type="number"
                  min="0"
                  placeholder={0}
                  value={
                    pixelToMm(marginBottom) === 0 ? '' : pixelToMm(marginBottom)
                  }
                  labelText={`${t('lbl.bottomMargin', 'Bottom')} [mm]`}
                  onChange={this.customMarginBottom}
                  plainText
                />
                <CustomInput
                  type="number"
                  min="0"
                  placeholder={0}
                  value={
                    pixelToMm(marginRight) === 0 ? '' : pixelToMm(marginRight)
                  }
                  labelText={`${t('lbl.rightMargin', 'Right')} [mm]`}
                  onChange={this.customMarginRight}
                  plainText
                />
              </div>
            </div>
          </div>
          <div>
            <Row style={{ margin: 0 }}>
              <Col>
                <p className="margin-0">
                  {t('lbl.orientation.colon', 'Orientation:')}
                </p>
              </Col>
            </Row>
            <Row style={{ margin: 0 }}>
              <Col xs={1}>
                <IconButtonMatCustom
                  onClick={() => this.setOrientation(ORIENTATION_LANDSCAPE)}
                  orientation={
                    this.props.layout.orientation === ORIENTATION_LANDSCAPE
                  }
                >
                  <LandscapeIcon />
                </IconButtonMatCustom>
              </Col>
              <Col xs={1} />
              <Col xs={1}>
                <IconButtonMatCustom
                  onClick={() => this.setOrientation(ORIENTATION_PORTRAIT)}
                  orientation={
                    this.props.layout.orientation === ORIENTATION_PORTRAIT
                  }
                >
                  <PortraitIcon />
                </IconButtonMatCustom>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PageSettings.propTypes = {
  t: PropTypes.func.isRequired,
  layout: PropTypes.object,
  updatePage: PropTypes.func,
  setOrientation: PropTypes.func,
  classes: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePage: actions.updatePage,
      setOrientation: actions.setOrientation,
    },
    dispatch
  );
};

export default withStyles(useStyles)(
  withTranslation('translations')(
    connect(mapStateToProps, mapDispatchToProps)(PageSettings)
  )
);
