import React from "react";
import CounterButtons from "./conunter-buttons";
type HeaderState = {
  count: number;
};

class Header extends React.Component<Record<string, never>, HeaderState> {
  state: HeaderState = {
    count: 0,
  };

  //   shouldComponentUpdate(): boolean {
  //     return false;
  //   }
  counterUpdate = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    // console.log("Header rendered");
    return (
      <header className="headers">
        <CounterButtons
          color="lightblue"
          count={this.state.count}
          handleCount={this.counterUpdate}
        />
        <h1>RoboFriends</h1>
      </header>
    );
  }
}

export default Header;
