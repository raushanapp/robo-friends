import React from "react";
import "../styles/scroll.css";
const Scroll = ({ children }: { children: React.ReactNode }) => {
  return <section className="scroll">{children}</section>;
};

export default Scroll;
