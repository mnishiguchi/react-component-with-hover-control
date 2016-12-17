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

        <div className="App-intro">

          <ComponentWithHoverControl
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            options={this.options}
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
      sensitivity: 7,   // in pixels
      interval   : 200, // in milliseconds
      timeout    : 400  // in milliseconds
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
