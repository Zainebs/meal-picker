import React from 'react';
import '../App.css';
function ContentDisplay({ meal, isBanned, addToBanList }) {
  if (!meal) {
    return <p>Loading...</p>;
  }

  const { strMeal, strCategory, strArea, strIngredient1, strMealThumb } = meal;

  const handleBanClick = (attribute) => {
    if (!isBanned(attribute)) {
      addToBanList(attribute);
    }
  };

  return (
    <div className="content-display">
      <div className = "img-container">
      <img src={strMealThumb} alt={strMeal} />
      <h2>{strMeal}</h2>
      </div>
      <p>Category: {strCategory}</p>
      <p>Area: {strArea}</p>
      <p>Main Ingredient: {strIngredient1}</p>
      <button onClick={() => handleBanClick(strCategory)}>Ban Category</button>
      <button onClick={() => handleBanClick(strArea)}>Ban Area</button>
      <button onClick={() => handleBanClick(strIngredient1)}>Ban Ingredient</button>
    </div>
  );
}

export default ContentDisplay;


