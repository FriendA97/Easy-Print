import React from 'react';
import './styles.css';
import CustomInput from '../../CustomInput';
import { Input } from 'reactstrap';
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import Select from 'react-select';
import {
  ITEM_IMAGE,
  ITEM_TEXT,
  ITEM_VARIABLE,
  ITEM_BARCODE,
  ITEM_LINE,
  ITEM_RECTANGLE,
  ITEM_ELLIPSE,
  BARCODE_EAN8,
  BARCODE_EAN13,
  BARCODE_CODE39,
  BARCODE_CODE128,
  BARCODE_UPCA,
  BARCODE_GS_128,
  BARCODE_QRCODE,
} from '../../../mylib/Constants';

import { Row, Col } from 'reactstrap';

const barcodes = [
  BARCODE_EAN8,
  BARCODE_EAN13,
  BARCODE_CODE39,
  BARCODE_CODE128,
  BARCODE_UPCA,
  BARCODE_GS_128,
];

const QRcodes = [BARCODE_QRCODE];

const strokeAndCorner = ['0', '2', '4', '6', '8', '10'];
const rotations = ['0', '90', '180', '270'];

const useStyles = makeStyles({
  root: {
    alignSelf: 'flex-start',
  },
});

const selectStyles = {
  menu: ({ top, ...remains }, _) => ({ ...remains }),
};

const TypeSettings = (props) => {
  const classes = useStyles();
  const {
    t,
    item,
    rotationSnaps,
    writeText,
    customText,
    toggleCustomText,
    customStrokeWidth,
    customCornerCurve,
    customVariableGroup,
    customVariable,
    customBarcode,
    customBarcodeType,
    writePrompt,
    variableGroup,
    barcodeVariables,
    customBarcodeGroup,
    codeToInfo,
  } = props;
  let typeSettings = null;
  let rotationSetting;

  if (item) {
    rotationSetting = (
      <Col xs={2}>
        <Row>
          <Col>
            <p className="typeSettings__title margin-0">
              {t('lbl.rotation', 'Rotation')}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Select
              styles={selectStyles}
              className="typeSettings__select--inline"
              value={
                item.rotation
                  ? {
                      value: item.rotation.toString(),
                      label: item.rotation.toString(),
                    }
                  : { value: '0', label: '0' }
              }
              options={rotations.map((deg) => ({
                value: deg,
                label: deg,
              }))}
              onChange={rotationSnaps}
            />
          </Col>
        </Row>
      </Col>
    );
    switch (item.itemType) {
      case ITEM_IMAGE:
        typeSettings = rotationSetting;
        break;
      case ITEM_TEXT:
        typeSettings = (
          <React.Fragment>
            <Col style={{ maxWidth: '100px' }}>
              <Row>
                <Col>
                  <p className="typeSettings__title--horizontal margin-0">
                    {t('lbl.custom_cansize', 'Custom')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Checkbox
                    classes={{
                      root: classes.root,
                    }}
                    checked={toggleCustomText}
                    onChange={customText}
                    color="default"
                    style={{ marginLeft: '-12px', marginTop: '-2px' }}
                  />
                </Col>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <p className="typeSettings__title margin-0">
                    {toggleCustomText
                      ? t('lbl.customText', 'Custom Text')
                      : t('lbl.text', 'Text')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  {toggleCustomText ? (
                    <Input
                      value={item.prompt}
                      onChange={(e) => writePrompt(e)}
                      placeholder={t('prompt.enterPrompt', 'Enter prompt')}
                      className="prompt__text"
                    />
                  ) : (
                    <Input
                      value={item.text}
                      onChange={(e) => writeText(e)}
                      placeholder={t(
                        'prompt.enterStaticText',
                        'Enter static text'
                      )}
                      className="prompt__text"
                    />
                  )}
                </Col>
              </Row>
            </Col>

            {rotationSetting}
          </React.Fragment>
        );
        break;
      case ITEM_VARIABLE:
        try {
          const info = codeToInfo[item.varCode];
          const label = info ? info.label : '';
          const group = info
            ? variableGroup.find((el) => el.code === info.group)
            : null;
          typeSettings = (
            <React.Fragment>
              <Col>
                <p className="typeSettings__title margin-0">
                  {t('lbl.variableGroup', 'Variable Group')}
                </p>
                <Select
                  styles={selectStyles}
                  value={
                    group
                      ? { value: group.label, label: group.label }
                      : { value: '', label: t('lbl.group', 'Group') }
                  }
                  options={variableGroup.map((group) => ({
                    value: group.label,
                    label: group.label,
                  }))}
                  onChange={customVariableGroup}
                />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <p className="typeSettings__title margin-0">
                      {t('lbl.variable', 'Variable')}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Select
                      styles={selectStyles}
                      value={{
                        value: `[${item.varCode}]`,
                        label: `[${label}]`,
                      }}
                      options={
                        group &&
                        group.variables.map((variable) => ({
                          value: variable.code,
                          label: variable.label,
                        }))
                      }
                      onChange={customVariable}
                    />
                  </Col>
                </Row>
              </Col>

              {rotationSetting}
            </React.Fragment>
          );
        } catch (e) {}
        break;
      case ITEM_BARCODE:
        try {
          const info = codeToInfo[item.varCode];
          const label = info ? info.label : '';
          const group = info
            ? barcodeVariables.find((el) => el.code === info.group)
            : null;
          typeSettings = (
            <React.Fragment>
              <Col>
                <Row>
                  <Col>
                    <p className="typeSettings__title margin-0">
                      {t('lbl.barcodeGroup', 'Barcode Group')}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Select
                      value={
                        group
                          ? { value: group.label, label: group.label }
                          : { value: '', label: t('lbl.group', 'Group') }
                      }
                      options={barcodeVariables.map((group) => ({
                        value: group.label,
                        label: group.label,
                      }))}
                      onChange={customBarcodeGroup}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <p className="typeSettings__title margin-0">
                      {t('prompt.selectValueToBind', 'Select value to bind')}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Select
                      value={{ value: item.varCode, label }}
                      options={
                        group &&
                        group.variables.map((variable) => ({
                          value: variable.code,
                          label: variable.label,
                        }))
                      }
                      onChange={customBarcode}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <p className="typeSettings__title margin-0">
                      {t('prompt.selectBarcodeType', 'Select barcode type')}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Select
                      styles={selectStyles}
                      value={{
                        value: item.type,
                        label: item.type.toUpperCase(),
                      }}
                      options={
                        item.type !== BARCODE_QRCODE
                          ? barcodes.map((value) => ({ value, label: value }))
                          : QRcodes.map((value) => ({ value, label: value }))
                      }
                      onChange={customBarcodeType}
                    />
                  </Col>
                </Row>
              </Col>
            </React.Fragment>
          );
        } catch (e) {}
        break;
      case ITEM_LINE:
        typeSettings = (
          <React.Fragment>
            <Col>
              <Row>
                <Col>
                  <p className="typeSettings__title margin-0">
                    {t('lbl.lineWidth', 'Line Width')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    className="typeSettings__select--inline"
                    value={
                      item.strokeWidth
                        ? { value: item.strokeWidth, label: item.strokeWidth }
                        : { value: '0', label: '0' }
                    }
                    options={strokeAndCorner.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={customStrokeWidth}
                  />
                </Col>
              </Row>
            </Col>
            {rotationSetting}
          </React.Fragment>
        );
        break;
      case ITEM_RECTANGLE:
        typeSettings = (
          <React.Fragment>
            <Col>
              <Row>
                <Col>
                  <p className="typeSettings__title margin-0">
                    {t('lbl.lineWidth', 'Line Width')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    className="typeSettings__select--inline"
                    value={
                      item.strokeWidth
                        ? { value: item.strokeWidth, label: item.strokeWidth }
                        : { value: '0', label: '0' }
                    }
                    options={strokeAndCorner.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={customStrokeWidth}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <p className="typeSettings__title margin-0">
                    {t('lbl.lineCurve', 'Line Curve')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    className="typeSettings__select--inline"
                    value={
                      item.cornerRadius
                        ? { value: item.cornerRadius, label: item.cornerRadius }
                        : { value: '0', label: '0' }
                    }
                    options={strokeAndCorner.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={customCornerCurve}
                  />
                </Col>
              </Row>
            </Col>
          </React.Fragment>
        );
        break;
      case ITEM_ELLIPSE:
        typeSettings = (
          <React.Fragment>
            <Col>
              <Row>
                <Col>
                  <p className="typeSettings__title margin-0">
                    {t('lbl.lineWidth', 'Line Width')}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    className="typeSettings__select--inline"
                    value={
                      item.strokeWidth
                        ? { value: item.strokeWidth, label: item.strokeWidth }
                        : { value: '0', label: '0' }
                    }
                    options={strokeAndCorner.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={customStrokeWidth}
                  />
                </Col>
              </Row>
            </Col>
          </React.Fragment>
        );
        break;
      default:
        break;
    }
  }
  return typeSettings;
};

export default withTranslation('translations')(TypeSettings);
