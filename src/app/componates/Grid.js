"use client";

import { useState } from "react";
import Card from "./Card";
import Map from "./Map";

const Grid = ({ properties }) => {
  const setInputandMapLocations = (value) => {
    setInputandMapLocations(value);
  };
  return (
    <>
      <div className="search-bar">
        <input
          placeholder="search location"
          onChange={(e) => setInputandMapLocations(e.target.value)}
          value={input}
        />
        <button>Search</button>
      </div>
    </>
  );
};

export default Grid;
