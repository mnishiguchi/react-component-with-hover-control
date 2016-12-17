import React, { Component } from 'react'
import uuid from 'uuid/v1'

import HoverControl from '../lib/hover-control'

class ComponentWithHoverControl extends Component {
  constructor(props) {
    super(props)
    this._elementId = `hover-control-${uuid()}`
  }

  render() {
    return (
      <section
        className="ComponentWithHoverControl"
        id={this._elementId}
      >
        ComponentWithHoverControl
      </section>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._setListenerById()
  }

  componentDidUpdate() {
    this._listener.remove()
    this._setListenerById()
  }

  componentWillUnmount() {
    this._listener.remove()
  }



  // ---
  // PRIVATE METHODS
  // ---


  _setListenerById = () => {
    this._listener = new HoverControl(
      document.getElementById(this._elementId),
      this.props.onEnterHandler,
      this.props.onExitHandler,
      {...this.props}
    )
  }
}

export default ComponentWithHoverControl
