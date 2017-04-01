import styles from './Layout.css';

import React, { Component } from 'react';

export default class Layout extends Component {

  render() {
    return <div className={styles.root}>
      {React.Children.map(this.props.children, (i)=>{return i})}
    </div>;
  }

};
