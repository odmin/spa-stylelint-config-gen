import React, { Component } from "react";
import styles from "./App.css";
import axios from "axios";
import Header from "./components/1-Header/Header";
import Small from "./components/2-Text/Small/Small";
import Landing from "./components/2-Text/Landing/Landing";
import Text from "./components/2-Text/Normal/Normal";
import Link from "./components/2-Text/Link/Link";
import Layout from "./components/3-Layout/Layout";
import Col from "./components/3-Layout/Col";
import Radio from "./components/4-Forms/Radio/Radio";
import Button from "./components/5-Button/Button";
import Preloader from "./components/6-Preloader/Preloader";
import Code from "./components/7-Code/Json";
import Conf from "../node_modules/stylelint-config-standard/index";

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
          let notDefined = {};
          for (let item in Conf.rules) {
            if (Object.keys(rules.rules).indexOf(item) === -1) {
              notDefined[item] = Conf.rules[item];
            }
          }
          this.setState({json: rules.rules});
          if (typeof res === "object") {
            this.setState({ "step": Object.keys(rules.rules)[0], ready: true })
          }
          else {
            console.error("Input data error: need Object, current - ", typeof this.state.json);
          }
          if (Object.keys(notDefined).length > 0) {
            console.log("Not defined rules in input json: ", notDefined);
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
              html = <code className={ styles.code } dangerouslySetInnerHTML={ { __html: code[val].toString() } } />
            }
            else {
              html = val.toString();
            }
            body.push(
              <Radio key={ val } name={ step }
                value={ val }
                onChange={ this.modify }
                checked={ this.state.rules[step] === val ? true : false }>
                { html }
              </Radio>
            )
          }
        }
      after.push(<footer key={ this.state.step } className={ styles.navigation }>
        <Text>Option {this.currentStep()+1} of {Object.keys(this.state.json).length}</Text>
        <Button onClick={ this.nextStep } BtType="default">Skip step &gt;&gt;</Button>
      </footer>);
      before.push(<Text key={ this.state.step+"__1" }>Choose one of these examples, that do you like more:</Text>);
      if ( this.state.json[step].hasOwnProperty("desc") ){
        before.push(<Small key={ this.state.step+"__2" }>{ this.state.json[step].desc }</Small>);
      }
    }
    else {
      body.push(
        <div key={ body.length+1 }>
          <p className={ styles.success }>Your configuration object is ready. Copy content from left panel.</p>
          <p className={ styles.navigation }>
            <Button onClick={ this.initial } BtType="default">&#10226; Rebuild</Button>
          </p>
        </div>
      )
    }

    return (
      <div key={ step ? step : body.length+2 }>
        { before }
        <div className={ styles.steps }>
          { body }
        </div>
        { after }
      </div>
    )
  }

  renderResult(rules) {
    let text = [];
    let count = 1;
    for (let item in this.state.rules) {
      console.log(count, '-', Object.keys(this.state.rules).length)
      if (this.state.rules.hasOwnProperty(item)) {
        if (this.state.json[item].type === "string") {
          text.push(<div key={item}>
            <Code type="key">{"  \"" + item + "\""}</Code>
            {": "}
            <Code type="value">{"\"" + this.state.rules[item] + "\""}</Code>
            { count === Object.keys(this.state.rules).length ? "" : "," }
          </div>);
        }
        else {
          text.push(<span key={item}>
            <Code type="key">{"  \"" + item + "\""}</Code>
            {": "}
            <Code type="value">{this.state.rules[item]}</Code>
            { count === Object.keys(this.state.rules).length ? "" : "," }
          </span>);
        }
      }
      count++;
    }
    return (
      <pre className={styles.result}>
        <code>
          <div>{"{"}</div>
          <div>
            <Code type="key">"extends"</Code>:
            <Code type="value">"stylelint-config-standard"</Code>,
          </div>
          <div>
            <Code type="key">"rules"</Code>: {"{"}
          </div>
          {text}
          <div>{" }"}</div>
          <div>{"}"}</div>
        </code>
      </pre>
    );
  }

  render() {
    return(
      <div className={ styles.root }>
        <Header />
        <div className="wrapper">
          <Layout>
            <Col col="1">
              <Landing>Simply build your personal configuration object for <Link href='//stylelint.io'>stylelint</Link></Landing>
              <Small>You choose one from exemples of code. The generator is building config with rules, based of your preferences. If current display code not actual for you, press [Skip step] button for go to next step.</Small>
            </Col>
            <Col col="2">
              { this.renderResult() }
              <Text>
                Copy result and paste him into <Link href='//stylelint.io/user-guide/configuration/'>stylelint configuration object</Link> in your project
              </Text>
              <Small>
                Note: we recommend using <Link href='https://github.com/stylelint/stylelint-config-standard'>stylelint-config-standard</Link> with sensible defaults. You must add it into your dependencies (or delete extends property - not recommended).
              </Small>
            </Col>
            <Col col="2">
              { this.state.ready && this.state.hasOwnProperty("step") ? this.renderStep(this.state.step) :
              this.state.ready ?
                <div className={ styles.error }>
                  Error. <Link href='https://github.com/odmin/spa-stylelint-config-gen/issues'>Report in issue</Link>
                </div>
              : <Preloader /> }
            </Col>
          </Layout>
        </div>
      </div>
    )
  }
}

export default App;
