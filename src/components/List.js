import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {

  render() {
    const {
      onEnterHandler,
      onExitHandler,
      options,
    } = this.props;

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
                options={options}
                onEnterHandler={onEnterHandler}
                onExitHandler={onExitHandler}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

export default List;
