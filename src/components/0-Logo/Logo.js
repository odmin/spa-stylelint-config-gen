import styles from './Logo.css';
import logo from './Logo.svg';

import React, { Component } from 'react';

export default class Logo extends Component {

  render() {
    return <img src={logo} className={styles.logo} alt={this.props.alt} />;
  }

};
