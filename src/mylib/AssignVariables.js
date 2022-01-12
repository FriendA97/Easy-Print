import { ITEM_VARIABLE, ITEM_BARCODE, BARCODELENGTH } from './Constants';
import { computeGTINCheckDigit } from './BarcodeUtils';

export default function assignVariables(layout, values) {
  return {
    ...layout,
    items: Object.fromEntries(
      Object.entries(layout.items).map(([key, item]) => [
        key,
        assignItem(item, values),
      ])
    ),
  };
}

function assignItem(item, values) {
  switch (item.itemType) {
    case ITEM_VARIABLE:
      return { ...item, text: values[item.varCode] || '' };
    case ITEM_BARCODE:
      return assignBarcodeItem(item, values);
    default:
      return item;
  }
}

function assignBarcodeItem(item, values) {
  let { varCode, prefix, type } = item;
  prefix = prefix || '';
  let value = values[varCode] || '';
  let text = ''; // return empty text if error

  // padding and check digit calculation for fixed length types
  const fixedLength = BARCODELENGTH[type];
  if (fixedLength && value) {
    if (!prefix && value.length === fixedLength) {
      // Value should already have correct check digit, let's check
      const checkDigit = computeGTINCheckDigit(
        value.substring(0, fixedLength - 1)
      );
      if (value.charAt(fixedLength - 1) === checkDigit)
        // correct check digit
        text = value;
    } else {
      // Add prefix, padding and check digit
      const padLength = fixedLength - prefix.length - 1;
      if (padLength >= value.length) {
        // value is short enough
        value = prefix + value.padStart(padLength, '0');
        const checkDigit = computeGTINCheckDigit(value);
        if (checkDigit != null) {
          text = value + checkDigit;
        }
      }
    }
  } else {
    text = prefix + value;
  }
  return { ...item, text: value };
}
