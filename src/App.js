import React, { Component } from 'react';
import NotificationSystem   from 'react-notification-system';

import List from './components/List';
require('./App.css');

class App extends Component {
  render() {

    const items = [
      { id: 1, name: "ruby" },
      { id: 2, name: "javascript" },
      { id: 3, name: "elixir" },
      { id: 4, name: "c++" },
      { id: 5, name: "java" },
    ];

    return (
      <div className="App">
        <NotificationSystem
          ref="notificationSystem"
        />

        <div className="App-header">
          <h2>
            React list component
            <br />
            <small>with event-sensitivity control</small>
          </h2>
        </div>

        <div className="App-intro">
          <List
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            options={this.options}
            items={items}
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
    // console.log('onEnterHandler was invoked')
    e.target.style.backgroundColor = "#ff70ca";
    this._addNotification( `${e.target.classList[0]} was ${e.type}'ed` );
  }

  onExitHandler = (e) => {
    // console.log('onExitHandler was invoked')
    e.target.style.backgroundColor = null; // "#caff70"
    this._addNotification( `${e.target.innerHTML} was ${e.type}'ed` );
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


  _addNotification(message, level='success') {
    this._notificationSystem.addNotification({message, level});
  }
}

export default App;
