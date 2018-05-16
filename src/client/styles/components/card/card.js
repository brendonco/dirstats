import PropTypes from "prop-types";
import React from "react";

export const Card = ({ className = "", ...props }) => {
  const prefixClassname = "card";
  const componentClassnames = `${prefixClassname} ${className}`;

  return <article className={componentClassnames}>{props.children}</article>;
};

export default Card;
