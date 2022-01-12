import { i18n } from 'e-p';
export const NUMBERFORMATTER = 'numberFormatter';
export const SHOTFORMATTER = 'shotFormatter';
export const CURRENCYFORMATTER = 'currencyFormatter';

export const EASYPRINT_VARIABLEGROUP = () => {
  return [
    {
      label: i18n.t('Order'),
      variables: [
        {
          code: 'orderid',
          label: i18n.t('Order id'),
        },
        {
          code: 'orderdate',
          label: i18n.t('Order date'),
        },
        {
          code: 'color.colourcode',
          label: i18n.t('Color code'),
        },
        {
          code: 'item.productname',
          label: i18n.t('Product name'),
        },
        {
          code: 'item.basecode',
          label: i18n.t('Basecode'),
        },
        {
          code: 'item.cansizecode',
          label: i18n.t('Can size'),
        },
      ],
    },
    {
      label: i18n.t('Formula'),
      variables: [
        /**
         * Special cases for fomula colorants
         * lets agree the handling
         * (implement general solution so that we can use this for others as well)
         * TODO: An check if this is usable way of marking how the data should be transferred
         */
        {
          code: 'item.cnts.[_].cntcode',
          label: i18n.t('Formula colorants in line'),
        },
        {
          code: 'item.cnts.[|].cntcode',
          label: i18n.t('Formula colorants (each in own row)'),
        },
        {
          code: 'item.cnts.[_].volume',
          formatter: SHOTFORMATTER,
          label: i18n.t('Formula colorant amounts in line'),
        },
        {
          code: 'item.cnts.[|].volume',
          formatter: SHOTFORMATTER,
          label: i18n.t('Formula colorant amounts (each in own row)'),
        },
      ],
    },
    {
      label: i18n.t('Site details'),
      variables: [
        {
          code: 'site.sitename',
          label: i18n.t('Site name'),
        },
        {
          code: 'site.address1',
          label: i18n.t('Address 1st line'),
        },
        {
          code: 'site.address2',
          label: i18n.t('Address 2st line'),
        },
        {
          code: 'site.companyname',
          label: i18n.t('Company name'),
        },
        {
          code: 'site.website',
          label: i18n.t('Web site'),
        },
      ],
    },
    {
      label: i18n.t('Prices'),
      variables: [
        {
          code: 'item.price.excTaxCan.cntVolume',
          formatter: NUMBERFORMATTER,
          label: i18n.t('Total cnt volume'),
        },
        {
          code: 'item.price.excTaxCan.tintPrice',
          formatter: CURRENCYFORMATTER,
          label: i18n.t('Tint price for can (exc. tax)'),
        },
      ],
    },
  ];
};

export const EASYPRINT_BARCODE_VARIABLES = () => {
  return [
    {
      label: i18n.t('Order'),
      variables: [
        {
          code: 'can.defbarcode',
          label: i18n.t('Can barcode'),
        },
        {
          code: 'product.infopage',
          label: i18n.t('Product infopage'),
        },
      ],
    },
  ];
};

export const EXAMPLE_ORDERITEM = {
  site: {
    address1: 'Valokaari 6',
    address2: null,
    companyname: 'Stark',
    computerid: null,
    country: 'AU',
    databasename: null,
    email: null,
    latitude: 60.462634,
    longitude: 22.280273,
    phone: 'n',
    postcode: '00750',
    replicationgroup: '_ONLY_SITE_0',
    replonewayformulas: false,
    replonewaysales: false,
    replschedule: null,
    repltype: null,
    sitecomputerid: null,
    sitedescription: null,
    siteid: 0,
    sitelicense: null,
    sitename: 'First testing site',
    timezone: null,
    website: null,
    zoneid: 1,
  },
  orderid: 57285,
  zoneid: 1,
  orderdate: '2020-01-16T06:27:09+00:00',
  color: {
    altcolourcode: 'ASF 1011',
    colourcode: 'ASF 1011',
    colourid: 1028,
    colournames: [],
    rgb: 8087659,
  },
  product: {
    blendedbase: null,
    description:
      'Basic exterior use three base product with excellent colour space coverage and good hiding power.',
    extenderid: null,
    has_matching: true,
    infopage: 'http://www.chromaflo.com/en-US/Technical-Data-Sheets.aspx',
    prodimageid: 1,
    prodposition: 9999,
    productid: 1,
    producttype: null,
    productzname: 'Exterior 2401 AABC',
    systemid: 1,
    usepcomment: false,
  },
  base: {
    basecode: 'C',
    baseid: 3,
    coefficient: 1,
    gravimetricfill: false,
    maxfill: 0.1,
    minfill: null,
    nominalfill: 0.9,
    specificgravity: 1,
  },
  formula: {
    baseid: 3,
    fcomment: 'NC',
    formulaid: 718,
    pcomment: 'Not under 4l can',
  },
  card: null,
  customer: null,
  customerid: null,
  can: {
    cansizecode: '1 l',
    cansizeid: 3,
    imageid: null,
    nominalamount: 1000,
    gravimetric: false,
    baseid: 3,
    canid: 10,
    canshapeid: null,
    defbarcode: '978020137962', // Valid EAN13 code with check digit
    fill: 1,
    basevolume: 1000,
  },
  notes: null,

  item: {
    itemid: null,
    colourcode: 'ASF 1011',
    rgb: 8087659,
    productname: 'Exterior 2401 AABC',
    basecode: 'C',
    cansizecode: '1 l',
    ncans: 1,
    cnts: [
      {
        altcode: null,
        bfsgrade: '1',
        cleaninginterval: null,
        cleaningthreshold: null,
        cntcode: 'FT',
        cntid: 3,
        description: 'Alternate 9 colorant',
        rgb: 4194432,
        specificgravity: 1.33,
        volume: 10.950756309461,
      },
      {
        altcode: null,
        bfsgrade: '1',
        cleaninginterval: null,
        cleaningthreshold: null,
        cntcode: 'TT',
        cntid: 14,
        description: 'Alternate 9 colorant',
        rgb: 0,
        specificgravity: 1.29,
        volume: 17.794978886470002,
      },
      {
        altcode: null,
        bfsgrade: '1',
        cleaninginterval: null,
        cleaningthreshold: null,
        cntcode: 'VT',
        cntid: 16,
        description: 'Alternate 9 colorant',
        rgb: 12337168,
        specificgravity: 1.85,
        volume: 8.213067464903,
      },
      {
        altcode: null,
        bfsgrade: '1',
        cleaninginterval: null,
        cleaningthreshold: null,
        cntcode: 'XT',
        cntid: 17,
        description: 'Alternate 9 colorant',
        rgb: 16777215,
        specificgravity: 2.09,
        volume: 29.430158105493,
      },
    ],
    notes: null,
    price: {
      analysis: {
        base: 0,
        cnt: 0.7083513270544595,
        hardener: 0,
        margin: 0.10797520355778532,
        tax: 0.1836734693877552,
      },
      excTaxCan: {
        baseCost: 0,
        baseMargin: 0,
        basePrice: 0,
        baseTaxRate: 0.225,
        cntCost: 0.9421072649824311,
        cntMargin: 0.04564783705838504,
        cntMass: 114.22323390568035,
        cntPrice: 0.9877551020408162,
        cntTaxRate: 0.225,
        cntVolume: 66.388960766327,
        cost: 0.9421072649824311,
        discount: 0,
        hardenerCost: 0,
        hardenerMargin: 0,
        hardenerPrice: 0,
        listPrice: 1.0857142857142856,
        margin: 0.1436070207318545,
        maxPrice: null,
        price: 1.0857142857142856,
        priceGroup: null,
        priceGroupBarcode: null,
        pricePerKilogram: 0.9744136118114657,
        pricePerLitre: 1.0181222102431284,
        tax: 0.24428571428571444,
        taxRate: 0.225,
        tintCost: 1.0421072649824312,
        tintFee: 0.1,
        tintPrice: 1.0857142857142856,
        totalMass: 1114.2232339056804,
        totalVolume: 1066.388960766327,
      },
      incTaxCan: {
        baseCost: 0,
        baseMargin: 0,
        basePrice: 0,
        baseTaxRate: 0.225,
        cntCost: 1.1540813996034782,
        cntMargin: 0.055918600396521745,
        cntMass: 114.22323390568035,
        cntPrice: 1.21,
        cntTaxRate: 0.225,
        cntVolume: 66.388960766327,
        cost: 1.1540813996034782,
        discount: 0,
        hardenerCost: 0,
        hardenerMargin: 0,
        hardenerPrice: 0,
        listPrice: 1.33,
        margin: 0.17591860039652185,
        maxPrice: null,
        price: 1.33,
        priceGroup: null,
        priceGroupBarcode: null,
        pricePerKilogram: 1.1936566744690458,
        pricePerLitre: 1.2471997075478325,
        tax: 0.24428571428571444,
        taxRate: 0.225,
        tintCost: 1.2765813996034783,
        tintFee: 0.12250000000000001,
        tintPrice: 1.33,
        totalMass: 1114.2232339056804,
        totalVolume: 1066.388960766327,
      },
    },
  },
};
