import styles from './Normal.css';

import React, { Component } from 'react';

export default class Normal extends Component {

  render() {
    return <p className={styles.root}>{React.Children.map(this.props.children, (i)=>{return i})}</p>;
  }

};
