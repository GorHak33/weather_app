import React, { useState } from "react";
import styles from "./Search.module.scss";

interface SearchProps {
  onSearch: (city: string, unit: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");

  const handleSearch = () => {
    onSearch(city, unit);
  };

  const handleUnitChange = (
    selectedUnit: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUnit(selectedUnit.target.value);
  };

  return (
    <div
      className={styles.searchContainer}
      style={{ backgroundColor: "purple" }}
    >
      <div className={styles.centeredDiv}>
        <input
          className={styles.inputText}
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search City</button>
      </div>
      <div className={styles.unitCheckbox}>
        <label>
          <input
            type="radio"
            value="metric"
            onChange={handleUnitChange}
            checked={unit === "metric"}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            onChange={handleUnitChange}
            checked={unit === "imperial"}
          />
          Fahrenheit
        </label>
      </div>
    </div>
  );
};

export default Search;
