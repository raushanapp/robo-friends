import React from "react";
import "../styles/search-box.css";

const SearchBox = ({
  searchChange,
}: {
  searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <section className="search-box">
      <input
        type="search"
        placeholder="search robots"
        onChange={searchChange}
      />
    </section>
  );
};

export default SearchBox;
