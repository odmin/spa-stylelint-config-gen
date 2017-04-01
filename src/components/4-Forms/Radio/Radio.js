import styles from './Radio.css';

import React, { Component } from 'react';

export default class Radio extends Component {

  render() {
    return <label className={styles.root}>
      <input type="radio"
        name={ this.props.name }
        className={styles.input}
        value={ this.props.value }
        onChange={ this.props.onChange }
        checked={ this.props.checked } />
      {React.Children.map(this.props.children, (i)=>{return i})}
    </label>;
  }

};
