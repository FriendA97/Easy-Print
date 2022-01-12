import React, { Component } from 'react';
import { EasyPrint, Preview } from 'e-p';
import axios from 'axios';
import {
  EASYPRINT_VARIABLEGROUP,
  EXAMPLE_ORDERITEM,
  EASYPRINT_BARCODE_VARIABLES,
} from './Constants';

const initial_layout = {
  items: {
    0: {
      itemType: 'text',
      text: 'Text',
      width: 50,
      height: 20,
      fontSize: 12,
      fontFamily: 'Noto Sans',
      customText: false,
      layerRef: 'null',
      rotation: 0,
      prompt: '',
      x: 50,
      y: 30,
      id: 0,
      name: 'text1',
    },
    1: {
      itemType: 'text',
      text: '',
      width: 50,
      height: 20,
      fontSize: 12,
      fontFamily: 'Noto Sans',
      customText: true,
      color: '#FF6347',
      layerRef: 'null',
      prompt: 'Enter prompt',
      rotation: 0,
      x: 50,
      y: 50,
      id: 1,
      name: 'text2',
    },
    2: {
      itemType: 'variable',
      value: { code: '', label: 'Variable' },
      width: 100,
      height: 20,
      x: 60,
      y: 60,
      rotation: 0,
      id: 2,
      name: 'variable1',
      fontSize: 12,
      fontFamily: 'Noto Sans',
    },
    3: {
      itemType: 'variable',
      value: { code: 'orderid', label: 'Order id' },
      width: 100,
      height: 20,
      x: 100,
      y: 60,
      rotation: 0,
      id: 3,
      name: 'variable2',
      variableGroup: 'Order',
      fontSize: 12,
      fontFamily: 'Noto Sans',
    },
  }, // to map items ids to items
  itemids: [0, 1, 2, 3], // to maintain order of items
  width: { pixel: 500, mm: 90 }, // width
  height: { pixel: 500, mm: 29 }, // height
  marginTop: 0, // editor page margins in mm
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  orientation: 'landscape',
};

export default class App extends Component {
  render() {
    return (
      <div>
        <EasyPrint
          initialLayout={initial_layout}
          variableGroup={EASYPRINT_VARIABLEGROUP()}
          barcodeVariables={EASYPRINT_BARCODE_VARIABLES()}
          orderItem={EXAMPLE_ORDERITEM}
          formatters={{ shotFormatter: () => {}, priceFormatter: () => {} }}
          axios={axios}
        />
        {/* <Preview
          formatters={{ shotFormatter: () => {}, priceFormatter: () => {} }}
          layout={initial_layout}
          standAlone
        /> */}
      </div>
    );
  }
}
