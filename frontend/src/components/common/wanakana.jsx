import React from 'react';
import { bind as wkBind, unbind as wkUnbind } from 'wanakana';

import './wanakana.css';

class Wanakana extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      bound: false,
    };
    this.doBind = this.doBind.bind(this);
    this.doUnbind = this.doUnbind.bind(this);
  }

  componentDidMount() {
    if (this.props.translate)
      this.doBind();
    this.focus();
  }

  componentWillUnmount() {
    this.doUnbind();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.translate !== this.state.bound) {
      if (newProps.translate) {
        this.doBind();
      } else {
        this.doUnbind();
      }
    }
  }

  doBind() {
    if (!this.state.bound) {
      wkBind(document.querySelector('.wanakana-input'));
      this.setState({
        bound: true,
      });
    }
  }

  doUnbind() {
    if (this.state.bound) {
      wkUnbind(document.querySelector('.wanakana-input'));
      this.setState({
        bound: false,
      });
    }
  }

  onChangeHandler(evt) {
    this.setState({
      textInput: evt.target.value,
    });
  }

  handleKeyPress(evt) {
    if (evt.key === 'Enter') {
      this.props.onInputSubmit(evt.target.value);
      evt.target.value = '';
      this.focus();
    }
  }

  focus() {
    document.getElementById("wanakana-input").focus();
  }

  render() {
    return (
      <div className="form-group">
        <input className="form-control wanakana-input" id="wanakana-input"
          onKeyPress={this.handleKeyPress.bind(this)}
          placeholder={this.props.translate ? '日本語で入力してください' : 'Type in English'} />
      </div>
    );
  }
}

export default Wanakana;