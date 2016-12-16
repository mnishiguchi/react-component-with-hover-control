import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {
  render() {
    return (
      <div
        className="List"
      >
        <ul>
          {
            this.props.items.map(item =>
              <ListItem
                item={item}
                key={item.id}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

export default List;
