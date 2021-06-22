import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Store from "./store";
import "./index.less";
class Home extends React.Component {
  constructor(props) {
    super();
    this.isServer = props.__server__;
  }
  static async getInitData(S, isServe = false) {
    const store = S[Store.namespace];
    store._updateServer_(isServe);
    await store.getList();
  }
  get Store() {
    return this.props[Store.namespace];
  }
  componentDidMount() {
    if (!this.Store.__server__) {
      Home.getInitData(this.props);
    }
  }
  render() {
    const { list, getList } = this.Store;
    return (
      <div className="home">
        home <Link to="/about"> about </Link>
        <button
          onClick={() => {
            getList();
          }}
        >
          获取列表
        </button>
        {(list || []).map((item, index) => {
          return (
            <div key={index}>
              <span style={{ display: "inline-block", width: "30%" }}>
                name:{item.name}
              </span>
              <span style={{ display: "inline-block", width: "30%" }}>
                desc:{item.desc}
              </span>
              <span style={{ display: "inline-block", width: "30%" }}>
                time:{item.time}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect((state) => {
  return state;
})(Home);
