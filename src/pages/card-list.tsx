import React from "react";
import "../App.css";
import Card from "../components/card";

interface roboListItem {
  id: number;
  name: string;
  email: string;
}

interface CardListProps {
  robos: roboListItem[];
}

const CardList: React.FC<CardListProps> = ({ robos }) => {
  return (
    <section className="robo-container scroll-hide">
      {robos?.map((r) => {
        return <Card key={r.id} {...r} />;
      })}
    </section>
  );
};

export default CardList;
