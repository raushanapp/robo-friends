import { useCallback, useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import "./main-page.css";
import Header from "../components/header";
import SearchBox from "../components/search-box";
import Scroll from "../components/scroll";
import CardListComponent from "../components/card-list";
import type { Robots } from "../store/types";

export interface MainPageProps {
  searchField: string;
  robots: Robots[];
  isPending: boolean;
  error: string | null;
  setSearchField: (text: string) => void;
  onRequestRobots: () => void;
}

const MainPage = ({
  searchField,
  robots,
  isPending,
  error,
  setSearchField,
  onRequestRobots,
}: MainPageProps) => {
  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots]);

  const onSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchField(e.target.value),
    [setSearchField],
  );

  const filteredRobots = useMemo(() => {
    const query = searchField.toLowerCase();
    return robots.filter((robot) => robot.name.toLowerCase().includes(query));
  }, [robots, searchField]);

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <section className="app">
      <Header />
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardListComponent robos={filteredRobots} />
      </Scroll>
    </section>
  );
};

export default MainPage;
