import React from "react";
import "../styles/buttom.css";

interface BtnProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ButtonComponent: React.FC<BtnProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button className={"btnMinus"} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonComponent;
