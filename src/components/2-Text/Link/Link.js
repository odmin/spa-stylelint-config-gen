import styles from './Link.css';

import React, { Component } from 'react';

export default class Link extends Component {

  render() {
    return <a className={styles.root} href={this.props.href} target={this.props.target}>
      {React.Children.map(this.props.children, (i)=>{return i})}
    </a>;
  }

};
