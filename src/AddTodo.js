import React, {Component} from "react";

class AddTodo extends Component {
  constructor(){
    super()
    this.state = {
      inputText: "",
    }
  }
  onChangeText(event) {
    const value = event.target.value;
    this.setState({
      inputText: value
    });
  }
  onClickAdd() {
    const value = this.state.inputText;

    if (value.trim().length === 0) {
      return;
    }
    
    this.setState({
      inputText: ""
    });

    // 親に通知
    this.props.onAdd(value.trim());
  }
  render(){
    return <div>
      <input
        type="text"
        value={this.state.inputText}
        onChange={event => this.onChangeText(event)}
      />
      <button onClick={event => this.onClickAdd()}>追加</button>
    </div>
  }
}
export default AddTodo;