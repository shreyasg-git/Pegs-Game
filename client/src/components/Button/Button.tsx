import React from "react";
import "./Button.scss";
const Button: React.FC<ButtonPropsType> = ({ title, style, clickHandler }) => {
  return (
    <div
      className="btn"
      style={style}
      onClick={() => {
        clickHandler();
      }}
    >
      {title}
    </div>
  );
};

interface ButtonPropsType {
  title: string;
  clickHandler: Function;
  style?: object;
}

export default Button;
