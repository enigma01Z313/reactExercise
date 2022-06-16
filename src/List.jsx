import React, { Component } from "react";
import Input from "./components/Input";
import Button from "./components/Button";

export default class List extends Component {
  state = {
    text: "ssss",
    editMode: false,
  };

  textInput = React.createRef();

  changeValue = (newVal) => {
    this.setState({ text: newVal });
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode }, () => {
      this.textInput?.current?.focus();
    });
  };

  rendeEditableText = () => {
    if (this.state.editMode) {
      return (
        <>
          <Input
            value={this.state.text}
            changeValue={this.changeValue}
            thisRef={this.textInput}
          />
          <Button handleClick={this.toggleEditMode} />
        </>
      );
    } else {
      return (
        <>
          <h2>Duble click to edit</h2>
          <span onDoubleClick={this.toggleEditMode}>{this.state.text}</span>
        </>
      );
    }
  };

  render() {
    return this.rendeEditableText();
  }
}
