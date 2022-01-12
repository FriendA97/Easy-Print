import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.css';
import FontStyle from '../FontStyle';
import { makeStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { default as IconButtonMat } from '@material-ui/core/IconButton';
import { ITEM_TEXT, ITEM_VARIABLE } from '../../mylib/Constants';
import { Col } from 'reactstrap';

const useStyles = makeStyles({
  root: {
    padding: '8px',
  },
});

const Alignments = (props) => {
  const classes = useStyles();
  const {
    item,
    updateItem,
    moveItemBottom,
    moveItemDown,
    moveItemTop,
    moveItemUp,
  } = props;
  const layeringSectionStyle = classnames('editProps__layering', {
    'editProp__layering--withoutFont':
      item && item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE,
  });
  const alignItem = (align) => {
    let changedItem = {};
    switch (align) {
      case 'right':
      case 'center':
      case 'left':
        changedItem = { ...item, align };
        break;
      case 'top':
      case 'middle':
      case 'bottom':
        changedItem = { ...item, verticalAlign: align };
        break;
      default:
        break;
    }
    updateItem(changedItem);
  };

  const moveItemLayer = (direction) => {
    switch (direction) {
      case 'down':
        moveItemDown(item);
        break;
      case 'up':
        moveItemUp(item);
        break;
      case 'bottom':
        moveItemBottom(item);
        break;
      case 'top':
        moveItemTop(item);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Col xs={'auto'} style={{ display: 'flex', padding: 0 }}>
        <FontStyle
          isDisabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          item={item}
          updateItem={updateItem}
        />
        <IconButtonMat
          title="Align text to left"
          disabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          onClick={() => alignItem('left')}
          classes={{
            root: classes.root,
          }}
        >
          <FormatAlignLeftIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Align text to center"
          onClick={() => alignItem('center')}
          disabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          classes={{
            root: classes.root,
          }}
        >
          <FormatAlignCenterIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Align text to right"
          onClick={() => alignItem('right')}
          disabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          classes={{
            root: classes.root,
          }}
        >
          <FormatAlignRightIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Align text to top"
          onClick={() => alignItem('top')}
          disabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          classes={{
            root: classes.root,
          }}
        >
          <VerticalAlignTopIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Align text to middle"
          onClick={() => alignItem('middle')}
          disabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          classes={{
            root: classes.root,
          }}
        >
          <VerticalAlignCenterIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Align text to bottom"
          onClick={() => alignItem('bottom')}
          disabled={
            !item ||
            (item.itemType !== ITEM_TEXT && item.itemType !== ITEM_VARIABLE)
          }
          classes={{
            root: classes.root,
          }}
        >
          <VerticalAlignBottomIcon />
        </IconButtonMat>
      </Col>

      <Col xs={'auto'} style={{ padding: 0, maxWidth: '160px' }}>
        <IconButtonMat
          title="Bring to front"
          onClick={() => moveItemLayer('top')}
          disabled={!item}
          classes={{
            root: classes.root,
          }}
        >
          <FlipToFrontIcon />
        </IconButtonMat>
        <IconButtonMat
          classes={{
            root: classes.root,
          }}
          title="Move up"
          onClick={() => moveItemLayer('up')}
          disabled={!item}
        >
          <ExpandLessIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Move down"
          onClick={() => moveItemLayer('down')}
          disabled={!item}
          classes={{
            root: classes.root,
          }}
        >
          <ExpandMoreIcon />
        </IconButtonMat>
        <IconButtonMat
          title="Bring to back"
          onClick={() => moveItemLayer('bottom')}
          disabled={!item}
          classes={{
            root: classes.root,
          }}
        >
          <FlipToBackIcon />
        </IconButtonMat>
      </Col>
    </Fragment>
  );
};

Alignments.propTypes = {
  item: PropTypes.object,
  updateItem: PropTypes.func,
  moveItemDown: PropTypes.func,
  moveItemUp: PropTypes.func,
  moveItemTop: PropTypes.func,
  moveItemBottom: PropTypes.func,
};

export default Alignments;
