import React, { Component } from 'react';

import EventSensitivityControl from '../lib/event-sensitivity-control';

class ComponentWithHoverControl extends Component {

  render() {
    return (
      <section
        className="ComponentWithHoverControl"
        onClick={e => this._handleAllEvents(e)}
        onDoubleClick={e => this._handleAllEvents(e)}
        onMouseOver={e => this._handleAllEvents(e)}
        onMouseLeave={e => this._handleAllEvents(e)}
      >
      </section>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._listeners = [];

    this._setListenersBySelectors([
      '.ComponentWithHoverControl',
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
    const targetClass = event.target.classList[0];

    // Ignore notification-system elements
    const r = new RegExp("notification")
    if (r.test(targetClass)) { return true; }
  }

  _setListenersBySelectors = (selectors) => {
    this._listeners = [];
    selectors.forEach(selector => {
      this._setListenerBySelector(selector)
    });
  }

  _setListenerBySelector = (selector) => {
    // console.log(`${element.classList[0]} was registered`)
    const {
      onEnterHandler,
      onExitHandler,
      options
    } = this.props;

    const listener = new EventSensitivityControl(
      document.querySelector(selector),
      onEnterHandler,
      onExitHandler,
      options
    );

    // Store the reference to this listener.
    if (!this._listeners.includes(listener)) {
      this._listeners.push(listener);
    }
  }
}

export default ComponentWithHoverControl;
