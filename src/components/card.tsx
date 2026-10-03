import React from "react";
import "../styles/crad.css";

interface CardProps {
  name: string;
  username?: string;
  email: string;
  id: number;
}

const Card: React.FC<CardProps> = ({ name, email, id }) => {
  return (
    <section className="card grow">
      <img alt="robots" src={`https://robohash.org/${id}?size=200x200`} />
      <article>
        <h2>Name: {name}</h2>
        <p>Email: {email}</p>
      </article>
    </section>
  );
};
export default Card;
