import React, { Component } from 'react';

import eventSensitivityControl from '../lib/event-sensitivity-control';

class ListItem extends Component {

  render() {
    return (
      <li
        className="ListItem"
        onClick={e => this._handleAllEvents(e)}
        onDoubleClick={e => this._handleAllEvents(e)}
        onMouseOver={e => this._handleAllEvents(e)}
        onMouseLeave={e => this._handleAllEvents(e)}
      >
        hello
      </li>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._registerListItemeners([
      '.ListItem',
      '.ul',
    ]);
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => {
      listener.remove();
    })
    this._listeners = [];
  }


  // ---
  // PRIVATE METHODS
  // ---


  /**
   * http://stackoverflow.com/a/32562118/3837223
   * https://facebook.github.io/react/docs/events.html#mouse-events
   */
  _handleAllEvents = (event) => {
    const eventType   = event.type;
    const targetClass = event.target.classListItem[0];

    // Ignore notification-system elements
    const r = new RegExp("notification")
    if (r.test(targetClass)) { return true; }
  }

  _registerListItemeners = (selectors) => {
    this._listeners = [];
    selectors.forEach(selector => {
      const element = document.querySelector(selector);
      this._listeners.push( this._setListItemener( element ) );
    });
  }

  _setListItemener = (element) => {
    // console.log(`${element.classListItem[0]} was registered`)
    const {
      onEnterHandler,
      onExitHandler,
      options
    } = this.props;

    const listener = new eventSensitivityControl(
      element,
      onEnterHandler,
      onExitHandler,
      options
    );

    return listener;
  }
}

export default ListItem;
