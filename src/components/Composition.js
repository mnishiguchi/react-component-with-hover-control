import React, { Component } from 'react'

import addHoverControlToComponent from '../lib/add-hover-control-to-component'

class Composition extends Component {
  render() {
    return (
      <section
        className="Composition"
      >
        Composition
      </section>
    )
  }
}

export default addHoverControlToComponent( Composition )
