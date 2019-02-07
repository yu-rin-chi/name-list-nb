import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  // httpClient:AxiosInstance;

  constructor() {
    super();

    this.state = {
      isLogin: false,
      departmentList: [],
      user: null,
      group: null,
      word:null,
      inputText: null
    };
  }

  componentDidMount() {
    this.httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
    });
    this.loadAuth()
      .then(() => {
        if (!this.state.isLogin) {
          console.log("then");
          return Promise.resolve();
        }
        return this.loadDepartments();
      })
      .catch(err => {
        alert("APIがエラーを返しました\n\n" + err);
      });
  }
  loadAuth() {
    console.log("auth");
    return this.httpClient
      .get("/auth", { params: { callback: "http://localhost:3000" } })
      .then(this.commonResponseHandling)
      .then(result => {
        console.log("result", result);
        if (result.is_login) {
          console.log("login");
          this.setState({ isLogin: true });
        } else if (result.auth_url) {
          window.location.href = result.auth_url;
        }
      });
  }

  // loadDepartments(num) {
  //   console.log("dep");
  //   return this.httpClient
  //     .get(`/who/seach/department_id=${num}/`)
  //     // .get(/who/seach/{ params: { query: inputText } })
  //     .then(this.commonResponseHandling)
  //     .then(result => {
  //       this.setState({ departmentList: result });
  //       console.log(this.state.departmentList);
  //     });
  // }

  loadUserId(inputText) {
    return this.httpClient
      .get(`/who/seach/user/user_id=${inputText}/`)
      .then(this.commonResponseHandling)
      .then(result => {
        console.log("---");
        console.log(result);
        console.log("---");
        this.setState({ user: result });
      });
  }

  // loadAllUser(inputText) {
  //   return this.httpClient
  //     .get("/who/search",{ params: { query: inputText } })
  //     .then(this.commonResponseHandling)
  //     .then(result => {
  //       this.setState({ user: result });
  //       console.log(this.state.user);
  //     });
  // }


  // クエリ検索の関数
  loadUserWord(inputText) {
    return this.httpClient
      .get("/who/search/", { params: { query: inputText } })
      .then(this.commonResponseHandling)
      .then(result => {
        console.log("---");
        console.log(result);
        console.log("---");
        this.setState({ group: result });
        
      });
  }

  commonResponseHandling(res) {
    console.debug(res);
    if (res.data.code !== "200") {
      console.error(res.data.data);
      return Promise.reject("API Error:" + res.data.data.message);
    }
    return Promise.resolve(res.data.data);
  }

  clickHandler = () => {
      this.loadUserId().catch(err => {
      alert("エラー発生");

    this.loadUserWord().catch(err => {
      alert("エラー発生");
    });
  
    });
  };



  handleTextChange(e) {
    console.log(e.target.value);
    this.setState({
      // テキスト入力の値
      inputText : e.target.value
    });
      // input
  }



  render() {
    console.log("render");
    // this.loadAllUser();
    return (
      <div className="App">
        {/* <select>
          {this.state.departmentList.map((row, index) => {
            return <option key={index}>{row.department_name}</option>;
          })}
        </select> */}

        {this.state.isLogin ? (
          <div>
            <form>
              <input
                 class="textbox"
                type="text"
                onChange={e => this.handleTextChange(e)}
              />
            </form>
            <div class="btns">
            <button class="btn_number" onClick={e => this.loadUserId(this.state.inputText)}>番号で表示</button>
             <button class="btn_freeword" onClick={e => this.loadUserWord(this.state.inputText)}>フリーワードで表示</button>
             </div>
            {this.state.user && (
              <div>
                {this.state.user.user_name}
                <br />
                {this.state.user.description}
                <img src={this.state.user.main_photo_url} alt="" />
              </div>
            )}
            {/* クエリ検索の結果表示テスト */}
            {this.state.group && (
              <ul>
                {this.state.group.item_list.map((row, index) => {
                  return (
                    <li key={index}>
                      {row.user_name}
                      <img src={row.photo_url} alt="test" />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <p>未ログイン</p>
        )}
      </div>
    );
  }
}

export default App;
