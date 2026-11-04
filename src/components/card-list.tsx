import React from "react";
import "../App.css";
import Card from "./card";
import { withErrorBoundary } from "./with-error-boundary";

interface roboListItem {
  id: number;
  name: string;
  email: string;
}

interface CardListProps {
  robos: roboListItem[];
}

const CardListComponent: React.FC<CardListProps> = ({ robos }) => {
  return (
    <section className="robo-container scroll-hide">
      {robos?.map((r) => {
        return <Card key={r.id} {...r} />;
      })}
    </section>
  );
};

const CardListWithErrorBoundary = withErrorBoundary(CardListComponent);

export default CardListWithErrorBoundary;
