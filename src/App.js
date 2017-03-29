import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import Preloader from './Preloader.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { rules: {}, ready: false, json: {} };
    this.modify = this.modify.bind(this);
    this.initial = this.initial.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  componentDidMount() {
    axios.get(this.props.json)
      .then( res => {
          const rules = JSON.parse(res.request.responseText);
          this.setState({json: rules.rules});
          if (typeof res === "object") {
            this.setState({ "step": Object.keys(rules.rules)[0], ready: true })
          }
          else {
            console.error("Input data error: need Object, current - ", typeof this.state.json);
          }
        }
      )
      .catch( err => {
          console.error("JSON error ", err);
        }
      )
  }

  initial() {
    this.setState({ rules: {}, "step": Object.keys(this.state.json)[0] })
  }

  currentStep() {
    let step = "";
    if (this.state.step) {
      step = Object.keys(this.state.json).findIndex(
        (item) => {
          if (item.indexOf(this.state.step) > -1) var key = item;
          return key;
        }
      );
    }
    return step;
  }

  nextStep() {
    if (this.state.step) {
      let step = this.currentStep();
      if (Object.keys(this.state.json).hasOwnProperty(step++)){
        this.setState({step: Object.keys(this.state.json)[step++]});
      }
    }
    else {
      this.setState({step: false});
    }
  }

  modify(event) {
    const rule = Object.assign({}, this.state.rules);
    rule[event.target.name] = event.target.value;
    this.setState({rules: rule});
    this.nextStep();
  }

  renderStep(step) {
    let before = [];
    let body = [];
    let after = [];
    let html = "";

    if (this.state.json.hasOwnProperty(step)) {
        const code = this.state.json[step].html;
        for (let val in code) {
          if (code.hasOwnProperty(val)) {
            if (this.state.json[step].hasOwnProperty("html")){
              html = <code dangerouslySetInnerHTML={ { __html: code[val].toString() } } />
            }
            else {
              html = val.toString();
            }
            body.push(
              <label key={ val } className="Steps__item">
                <input type="radio"
                  name={ step }
                  className="Steps__input"
                  value={ val }
                  onChange={ this.modify }
                  checked={ this.state.rules[step] === val ? true : false } />
                { html }
              </label>
            )
          }
        }
      after.push(<footer key={ this.state.step } className="Navigation">
        <p className="text">Option {this.currentStep()+1} of {Object.keys(this.state.json).length}</p>
        <button onClick={ this.nextStep } className="button button_default">Skip step &gt;&gt;</button>
      </footer>);
      before.push(<p key={this.state.step+"__1"} className="text">Choose one of these examples, that do you like more:</p>);
      if ( this.state.json[step].hasOwnProperty("desc") ){
        before.push(<p key={this.state.step+"__2"} className="text text_small">{ this.state.json[step].desc }</p>);
      }
    }
    else {
      body.push(
        <div key={ body.length+1 }>
          <p className="success">Your configuration object is ready. Copy content from left panel.</p>
          <p className="Navigation"><button className="button button_default" onClick={ this.initial }>&#10226; Rebuild</button></p>
        </div>
      )
    }

    return (
      <div key={ step ? step : body.length+2 }>
        { before }
        <div className="Steps">
          { body }
        </div>
        { after }
      </div>
    )
  }

  renderResult(rules) {
    let text = "";
    for (let item in this.state.rules) {
      if (this.state.rules.hasOwnProperty(item)) {
        if (this.state.json[item].type === "string") {
          text = text + "   \"" + item + "\": \"" + this.state.rules[item] + "\",\n";
        }
        else {
          text = text + "   \"" + item + "\": " + this.state.rules[item] + ",\n";
        }
      }
    }
    return (
      <textarea className="Result" rows="20" cols="30" disabled value={"{\n \"rules\": {\n" + text + "  }\n}"} />
    );
  }

  render() {
    return(
      <div className="App">
        <header className="header">
          <div className="wrapper">
            <span className="header__brand">
              <img src={logo} className="Logo" alt="logo" />
              <span className="header__branddesc">configuration object generator</span>
            </span>
          </div>
        </header>
        <div className="Layout">
          <div className="Layout__col Layout__col_1">
            <p className="text text_landing">Smiple build your personal configuration object for <a className="text__link" href="//stylelint.io">stylelint</a></p>
            <p className="text text_small">You choose one from exemples of code. The generator is building config with rules, based of your preferences. If current display code not actual for you, press [Skip step] button for go to next step.</p>
          </div>
          <div className="Layout__col Layout__col_2">
            { this.renderResult() }
            <p className="text">Copy result and paste him into <a className="text__link" href="//stylelint.io/user-guide/configuration/">stylelint configuration object</a> in your project</p>
          </div>
          <div className="Layout__col Layout__col_2">
            { this.state.ready && this.state.hasOwnProperty("step") ? this.renderStep(this.state.step) :
            this.state.ready ? <div className="error">Error. <a href="#">Report in issue</a></div> : <Preloader /> }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
