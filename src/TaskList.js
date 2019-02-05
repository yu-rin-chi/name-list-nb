import React, {Component} from "react";

class TaskList extends Component {
  render(){
    // タスクの配列を、フィルタリングして、新しい配列にする
    const displayTasks = this.props.tasks.filter(item => {
      switch(this.props.filterType){
        case "completed":
          return item.completed === true;
        case "active":
          return item.completed === false;
        case "all":
        default:
          return true;
      }
    });

    // タスクの配列を、DOMに変換するコード
    const nodes = displayTasks.map(item => {
      const node = item.completed === true 
          ? <del>{item.label}</del>
          : <span>{item.label}</span>;

      return (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={event => this.props.onChangeItem(item.id)}
            />
            {node}
          </label>
        </li>
      );
    });
    return (
      <ul>{nodes}</ul>
    )
  }
}
export default TaskList;