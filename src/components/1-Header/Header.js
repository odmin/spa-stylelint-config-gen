import styles from './Header.css';
import Logo from '../0-Logo/Logo';

import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <header className={styles.root}>
        <div className="wrapper">
          <span className={styles.brand}>
            <Logo alt="stylelint" />
            <span className={styles.description}>configuration object generator</span>
          </span>
        </div>
      </header>
    );
  }

};
