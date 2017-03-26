import React, { Component } from 'react';
import './Preloader.css';

class Preloader extends Component {
  render() {
    return (
      <div className="Preloader">
        <div className="Preloader__item Preloader__item_1"></div>
        <div className="Preloader__item Preloader__item_2"></div>
        <div className="Preloader__item Preloader__item_3"></div>
      </div>
    )
  }
}

export default Preloader;
