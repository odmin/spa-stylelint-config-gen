import styles from './Landing.css';

import React, { Component } from 'react';

export default class Landing extends Component {

  render() {
    return <p className={styles.root}>{React.Children.map(this.props.children, (i)=>{return i})}</p>;
  }

};
