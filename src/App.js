import React, { Component } from 'react';
import NotificationSystem   from 'react-notification-system';

import ComponentWithHoverControl from './components/ComponentWithHoverControl';
import Composition from './components/Composition';

require('./App.css');

const notificationStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // SearchPagelied to every notification, regardless of the notification level
      zIndex    : 10,
      fontSize  : '1rem',
      background: 'rgba(22, 82, 124, 0.8)',
      color     : 'rgb(202,178,161)'
    }
  }
};

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sensitivity: 7,   // in pixels
      interval   : 400, // in milliseconds
      timeout    : 0,   // in milliseconds
    }
  }

  render() {
    return (
      <div className="App">
        <NotificationSystem
          ref="notificationSystem"
          style={notificationStyle}
        />

        <div className="App-header">
          <h2>
            React component
            <br />
            <small>with hover-sensitivity control</small>
          </h2>
        </div>

        <form className="HoverControlOptions">
          <div>
            <strong>Sensitivity:</strong>{' '}
            <span className="text-muted">
              {this.state.sensitivity}
            </span>
            {' / '}
            <strong>Timeout:</strong>{' '}
            <span className="text-muted">
              {this.state.timeout}
            </span>
            {' / '}
            <strong>Interval:</strong>{' '}
            <span className="text-muted">
              {this.state.interval}
            </span>
          </div>
        </form>

        <div className="App-intro">

          <ComponentWithHoverControl
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            options={this.state.options}
          />

          <Composition
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            options={this.options}
          />

        </div>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;
  }


  // ---
  // PUBLIC METHODS
  // ---


  onEnterHandler = (e) => {
    e.target.style.backgroundColor = "#ff70ca";
    this._addNotification( `${e.target.id || e.target.classList[0]} was ${e.type}'d` );
  }

  onExitHandler = (e) => {
    e.target.style.backgroundColor = "#caff70";
    this._addNotification( `${e.target.id || e.target.classList[0]} was ${e.type}'d` );
  }

  options = () => {
    return {
      sensitivity: this.state.sensitivity,  // in pixels
      interval   : this.state.interval,     // in milliseconds
      timeout    : this.state.timeout,      // in milliseconds
    };
  };


  // ---
  // PRIVATE METHODS
  // ---


  _addNotification(message, level='info') {
    this._notificationSystem.addNotification({message, level});
  }
}

export default App;
