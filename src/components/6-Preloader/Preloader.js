import React, { Component } from 'react';
import styles from './Preloader.css';

class Preloader extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.item_1}></div>
        <div className={styles.item_2}></div>
        <div className={styles.item_3}></div>
      </div>
    )
  }
}

export default Preloader;
