import styles from './Json.css';

import React, { Component } from 'react';

export default class Json extends Component {
  render() {
    return (<span className={styles[this.props.type] || styles.root}>
      {React.Children.map(this.props.children, (i)=>{return i})}
    </span>);
  }

};
