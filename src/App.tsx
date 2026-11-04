import MainPage from "./pages/main-page";
import "./App.css";
import { connect } from "react-redux";
import { setSearchField, requestRobots } from "./store/actions";
import type { RootState } from "./store/store";

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

export default connector(MainPage);
