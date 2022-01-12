import React from 'react';
import { Text, Rect } from 'react-konva';
import AddTransformer from './Transformer';
import PropTypes from 'prop-types';
import Portal from './Portal';
import { gridSize, dragBoundItem } from '../../containers/Utils';

class Write extends React.Component {
  constructor() {
    super();
    this.state = {
      isDragging: false,
      x: 0,
      y: 0,
      textEditVisible: false,
      textValue: '',
    };
    this.shapeRef = React.createRef();
    this.trRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      x: this.props.item.x,
      y: this.props.item.y,
      textValue: this.props.item.text,
    });
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  dragBound = (pos, rotation) => {
    const { x, y } = dragBoundItem(
      pos,
      this.props.layout,
      this.props.item,
      rotation
    );
    return { x, y };
  };

  handleClickOutside = (event) => {
    if (this.inputRef && !this.inputRef.contains(event.target)) {
      this.setState({
        ...this.state,
        textEditVisible: false,
      });
    }
  };

  handleTextDbClick = (e) => {
    const stageBox = this.shapeRef.current.parent.parent
      .container()
      .getBoundingClientRect();
    const absPos = e.target.getAbsolutePosition();
    this.setState({
      textEditVisible: true,
      x: stageBox.left + absPos.x + window.pageXOffset,
      y: stageBox.top + absPos.y + window.pageYOffset,
      textValue: this.props.standAlone
        ? this.state.textValue
        : this.props.item.text,
    });
    // Autofocus
    setTimeout(() => {
      this.inputRef.focus();
    }, 150);
  };

  handleTextEdit = (e) => {
    this.setState({
      textValue: e.target.value,
    });
  };

  handleTextareaKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState(
        {
          textEditVisible: false,
          textValue: e.target.value,
        },
        () => {
          this.props.updateItem({
            ...this.props.item,
            text: this.state.textValue,
          });
        }
      );
    }
  };

  handleFocusout = (e) => {
    this.setState(
      {
        textEditVisible: false,
        textValue: e.target.value,
      },
      () => {
        this.props.updateItem({
          ...this.props.item,
          text: this.state.textValue,
        });
      }
    );
  };

  render() {
    const {
      item,
      zIndex,
      move,
      selectedItemId,
      readonly,
      selectItem,
      updateItem,
    } = this.props;

    const name = 'write' + item.id;
    const isSelected = item.id === selectedItemId;
    return (
      <React.Fragment>
        {isSelected && !readonly && (
          <Rect
            x={item.x - 2}
            y={item.y - 2}
            width={item.width + 4}
            height={item.height + 4}
            stroke={'#99EEFF88'}
            strokeWidth={2}
            shadowBlur={10}
            shadowOffset={{ x: 5, y: 5 }}
            shadowOpacity={0.5}
            rotation={item.rotation}
          />
        )}
        {item.customText && !item.text && (
          <Text
            text="(Double click to edit)"
            x={item.x + (item.width / 2 - 45)} // Center of parent item!
            y={item.y + item.height}
            fill={'#FF6347'}
            fontSize={8}
            align="center"
            verticalAlign="top"
            width={90}
            height={12}
          />
        )}

        <Text
          text={item.text ? item.text : item.prompt}
          ref={this.shapeRef}
          x={item.x}
          id={item.id}
          y={item.y}
          fill={item.text ? 'black' : '#FF6347'}
          name={name}
          fontSize={item.fontSize}
          align={item.align}
          verticalAlign={item.verticalAlign}
          width={item.width}
          height={item.height}
          onDblClick={this.handleTextDbClick}
          fontStyle={item.fontStyle}
          textDecoration={item.textDecoration}
          rotation={item.rotation}
          draggable={move && selectedItemId === item.id}
          fontFamily={item.fontFamily}
          dragBoundFunc={(pos) => this.dragBound(pos, Number(item.rotation))}
          //fill={this.state.isDragging ? 'green' : 'black'}
          onClick={readonly ? null : () => selectItem(item.id)}
          onDragStart={() => {
            this.setState({
              isDragging: true,
            });
          }}
          onDragEnd={(e) => {
            const x = Math.round(e.target.x() / gridSize) * gridSize;
            const y = Math.round(e.target.y() / gridSize) * gridSize;
            this.shapeRef.current.position({
              x,
              y,
            });
            updateItem({
              ...item,
              x,
              y,
            });
          }}
          onTransformEnd={() => {
            // transformer is changing scale
            const node = this.shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            updateItem({
              ...item,
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              height: node.height() * scaleY,
            });
          }}
        />

        {readonly || !move ? null : (
          <AddTransformer
            ref={this.trRef}
            selectedShapeName={isSelected ? name : null}
          />
        )}
        <Portal>
          {!readonly ? (
            <input
              ref={(node) => (this.inputRef = node)}
              value={this.state.textValue}
              style={{
                width: item.width,
                height: item.height,
                display: this.state.textEditVisible ? 'block' : 'none',
                position: 'absolute',
                top: this.state.y + 'px',
                left: this.state.x + 'px',
                border: '1px solid blue',
                zIndex,
              }}
              onChange={this.handleTextEdit}
              onKeyDown={this.handleTextareaKeyDown}
              onBlur={this.handleFocusout}
            />
          ) : (
            <div ref={(node) => (this.inputRef = node)} />
          )}
        </Portal>
      </React.Fragment>
    );
  }
}

Write.propTypes = {
  readonly: PropTypes.bool,
  item: PropTypes.object,
  selectedItemId: PropTypes.number,
  selectItem: PropTypes.func,
  updateItem: PropTypes.func,
  layout: PropTypes.object,
  standAlone: PropTypes.bool,
  zIndex: PropTypes.string,
  move: PropTypes.bool,
};

Write.defaultProps = {
  readonly: false,
  standAlone: false,
  zIndex: '0',
  move: false,
};

export default Write;
