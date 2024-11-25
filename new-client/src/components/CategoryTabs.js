import React from "react";
import "./CategoryTabs.css";

const categories = [
  "Today",
  "This Weekend",
  "Music",
  "Nightlife",
  "Food",
  "Online Events",
];

const CategoryTabs = ({ onCategorySelect }) => {
  const handleClick = (category) => {
    if (typeof onCategorySelect === "function") {
      onCategorySelect(category);
    } else {
      console.error("onCategorySelect is not defined or not a function.");
    }
  };

  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          className="button-29"
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
