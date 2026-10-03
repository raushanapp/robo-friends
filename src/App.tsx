import React from "react";
import "./App.css";
import CardList from "./pages/card-list";
import SearchBox from "./components/search-box";
import Scroll from "./components/scroll";
import { connect, type ConnectedProps } from "react-redux";
import { setSearchField, requestRobots } from "./store/actions";
import type { RootState } from "./store/store";
import Header from "./components/header";

const mapStateToProps = (state: RootState) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchProps = {
  setSearchField,
  onRequestRobots: requestRobots,
};

const connector = connect(mapStateToProps, mapDispatchProps);

type PropsFormRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFormRedux> {
  componentDidMount(): void {
    this.props.onRequestRobots();
  }

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchField(e.target.value);
  };

  render() {
    const { searchField, robots, isPending, error } = this.props;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>{error}</h1>
    ) : (
      <section className="app">
        <Header />
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robos={filteredRobots} />
        </Scroll>
      </section>
    );
  }
}

export default connector(App);
