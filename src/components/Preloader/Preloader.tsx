import React from "react";
import preloader from "../../assets/load.gif";

export const Preloader = () => {
  return (
    <img
      src={preloader}
      style={{ width: "100px", height: "100px" }}
      alt="preloader"
    />
  );
};
