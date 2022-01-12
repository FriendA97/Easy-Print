import { default as EasyPrint } from './App';
import Preview from './components/Preview';
import { computeGTINCheckDigit } from './mylib/BarcodeUtils';
import assignVariables from './mylib/AssignVariables';
import i18n from './localization/i18n';

export { EasyPrint, Preview, i18n, computeGTINCheckDigit, assignVariables };

export default { EasyPrint };
