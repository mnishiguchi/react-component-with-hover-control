import React, { Component } from 'react';

import EventSensitivityControl from '../lib/event-sensitivity-control';

class ListItem extends Component {

  render() {
    const {
      item,
      onEnterHandler,
      onExitHandler,
    } = this.props;

    return (
      <li
        className="ListItem"
        onMouseOver={e => onEnterHandler(e)}
        onMouseLeave={e => onExitHandler(e)}
        ref={node => this._node = node}
      >
        {item.name}
      </li>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    console.log(`monted: ${this._node.innerHTML}`)

    this._setListener();
  }

  componentWillUnmount() {
    this._removeListener();
  }


  // ---
  // PRIVATE METHODS
  // ---


  _setListener = () => {
    const {
      onEnterHandler,
      onExitHandler,
      options
    } = this.props;

    // console.log(Object.keys(this.props));
    // console.log(this.props.options);

    this._listener = new EventSensitivityControl(
      this._node,
      onEnterHandler,
      onExitHandler
    );
  }

  _removeListener = () => {
    this._listener.remove();
  }

} // class

export default ListItem;
