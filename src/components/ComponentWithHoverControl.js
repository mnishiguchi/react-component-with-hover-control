import React, { Component } from 'react'

import HoverControl from '../lib/hover-control'

class ComponentWithHoverControl extends Component {
  render() {
    return (
      <section
        className="ComponentWithHoverControl"
      >
        ComponentWithHoverControl
      </section>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._listeners = []

    this._setListenersBySelectors([
      '.ComponentWithHoverControl',
    ])
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => {
      listener.remove()
    })
    this._listeners = []
  }


  // ---
  // PRIVATE METHODS
  // ---


  _setListenersBySelectors = (selectors) => {
    this._listeners = []
    selectors.forEach(selector => {
      this._setListenerBySelector(selector)
    })
  }

  _setListenerBySelector = (selector) => {
    // console.log(`${element.classList[0]} was registered`)
    const listener = new HoverControl(
      document.querySelector(selector),
      this.props.onEnterHandler,
      this.props.onExitHandler,
      this.props.options
    )

    // Store the reference to this listener.
    if (!this._listeners.includes(listener)) {
      this._listeners.push(listener)
    }
  }
}

export default ComponentWithHoverControl
