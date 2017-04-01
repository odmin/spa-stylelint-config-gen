import styles from './Textarea.css';

import React, { Component } from 'react';

export default class Textarea extends Component {

  render() {
    return <textarea
      className={styles.root}
      rows={this.props.rows}
      cols={this.props.cols}
      disabled={this.props.disabled}
      value={this.props.value} />;
  }

};
