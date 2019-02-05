import React, {Component} from "react";

class Footer extends Component {
  constructor(){
    super();  
  }
  onChangeFilterType(event) {
    this.props.onChangeFilter(event.target.value);
  }
  render (){
    return (
      <div>
        <label>
          <input type="radio" value="all"
            checked={this.props.filterType === "all"}
            onChange={(event) => this.onChangeFilterType(event)}
          />
          すべて
        </label>
        <label>
          <input type="radio" value="active"
            checked={this.props.filterType === "active"}
            onChange={(event) => this.onChangeFilterType(event)}
          />
          未完了のみ
        </label>
        <label>
          <input type="radio" value="completed"
            checked={this.props.filterType === "completed"}
            onChange={(event) => this.onChangeFilterType(event)}
          />
          完了のみ
        </label>
      </div>
    )
  }


}
export default Footer;