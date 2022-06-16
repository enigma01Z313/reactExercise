import React, { Component } from "react";

export default class Input extends Component {
  state = {
    text: this.props.value ?? "",
  };

  handleChange = (e) => {
    this.props.changeValue(e.target.value);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text !== this.props.value)
      this.setState({ text: this.props.value });
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.text}
        onChange={this.handleChange}
        ref={this.props.thisRef}
      />
    );
  }
}
