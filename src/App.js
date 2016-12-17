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
            <label htmlFor="sensitivity">
              <strong>sensitivity:</strong>{' '}
            </label>
            <input
              id="sensitivity"
              type="number"
              step="5"
              value={this.state.sensitivity}
              onChange={event => {this.setState({ sensitivity: event.target.value })}}
            />
            { ' ' }
            <label htmlFor="interval">
              <strong>interval:</strong>{' '}
            </label>
            <input
              id="interval"
              type="number"
              step="100"
              value={this.state.interval}
              onChange={event => {this.setState({ interval: event.target.value })}}
            />
            { ' ' }
            <label htmlFor="timeout">
              <strong>timeout:</strong>{' '}
            </label>
            <input
              id="timeout"
              type="number"
              step="100"
              value={this.state.timeout}
              onChange={event => {this.setState({ timeout: event.target.value })}}
            />
          </div>
        </form>

        <div className="App-intro">

          <ComponentWithHoverControl
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            sensitivity={this.state.sensitivity}
            interval={this.state.interval}
            timeout={this.state.timeout}
          />

          <Composition
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            sensitivity={this.state.sensitivity}
            interval={this.state.interval}
            timeout={this.state.timeout}
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
