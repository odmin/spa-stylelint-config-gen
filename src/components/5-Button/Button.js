import styles from './Button.css';

import React, { Component } from 'react';

export default class Button extends Component {

  render() {
    return <button onClick={ this.props.onClick } className={styles[this.props.BtType] ? styles[this.props.BtType] : styles.root}>
      {React.Children.map(this.props.children, (i)=>{return i})}
    </button>;
  }

};
