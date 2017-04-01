import styles from './Col.css';

import React, { Component } from 'react';

export default class Col extends Component {

  count() {
    const col = "root_" + this.props.col;
    if (!styles[col]) console.warn("Layout with ", this.props.col, " cols is not defined in Col component, use default 1 col.");
    return (styles[col] || styles.root_1);
  }

  render() {
    return <div className={this.count()}>
      {React.Children.map(this.props.children, (i)=>{return i})}
    </div>;
  }

};
