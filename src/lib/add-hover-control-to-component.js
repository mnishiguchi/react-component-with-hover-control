import React, { Component } from 'react'
import uuid from 'uuid/v1'

import HoverControl from '../lib/hover-control'

function addHoverControlToComponent(MyComponent) {

  class ComponentWithHoverControl extends Component {

    constructor(props) {
      super(props)
      this._elementId = `hover-control-${uuid()}`
    }

    render() {
      return (
        <section
          id={this._elementId}
          >
          addHoverControlToComponent
          <MyComponent />
        </section>
      )
    }


    // ---
    // LIFECYCLE HOOKS
    // ---


    componentDidMount() {
      this._setListenerById( this._elementId )
    }

    componentWillUnmount() {
      this._listener.remove()
    }


    // ---
    // PRIVATE METHODS
    // ---


    _setListenerById = (id) => {
      this._listener = new HoverControl(
        document.getElementById(id),
        this.props.onEnterHandler,
        this.props.onExitHandler,
        {...this.props}
      )
    }
  }

  // Return the component class.
  return ComponentWithHoverControl
}

export default addHoverControlToComponent
