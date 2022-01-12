import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.css';
import { FormGroup, Input, Label } from 'reactstrap';

const customInput = (props) => {
  const {
    type,
    labelText,
    variant,
    modifier,
    plainText,
    inputSize,
    onChange,
    value,
    min,
    checked,
    placeHolder,
    disabled,
  } = props;
  const formGroupStyle = classnames({
    formGroup__container: true,
    'formGroup__container--horizontal': variant === 'horizontal',
    'formGroup__container--text': modifier === 'typeSettings',
    'formGroup__container--vertical': variant === 'vertical',
  });

  return (
    <FormGroup className={formGroupStyle} style={{ margin: 0 }}>
      <Label className="formGroup__label" for={`label${labelText}`}>
        {`${labelText}`}
      </Label>
      <Input
        disabled={disabled}
        checked={checked}
        min={min}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
        className={`formGroup__input formGroup__input--${inputSize}`}
        id={`label${labelText}`}
        bsSize={inputSize}
        plaintext={plainText}
      />
    </FormGroup>
  );
};

customInput.defaultProps = {
  type: '',
  inputSize: 'sm',
  plainText: false,
  variant: 'horizontal',
  labelText: '',
  onChange: () => {},
  min: '',
};

customInput.propTypes = {
  type: PropTypes.string,
  checked: PropTypes.bool,
  labelText: PropTypes.string,
  min: PropTypes.string,
  plainText: PropTypes.bool,
  placeHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputSize: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifier: PropTypes.string,
};

export default customInput;
