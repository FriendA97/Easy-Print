import { computeGTINCheckDigit } from '../mylib/BarcodeUtils';

describe('compute GTIN check digit', () => {
  it('valid examples', () => {
    expect(computeGTINCheckDigit('123456789012')).toBe('8');
    expect(computeGTINCheckDigit('123456789092')).toBe('0');
    expect(computeGTINCheckDigit('1234567890123')).toBe('1');
  });
});
