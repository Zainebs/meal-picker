// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ContentDisplay from './Components/ContentDisplay';
// import BanList from './Components/BanList';
// import './App.css';

// function App() {
//   const [randomMeal, setRandomMeal] = useState(null);
//   const [banList, setBanList] = useState([]);
//   const [previousMeals, setPreviousMeals] = useState([]);

//   useEffect(() => {
//     fetchRandomMeal();
//   }, []);

//   const fetchRandomMeal = async () => {
//     try {
//       const response = await axios.get(
//         'https://www.themealdb.com/api/json/v1/1/random.php'
//       );
//       const data = response.data.meals[0];

//       setPreviousMeals([...previousMeals, data]);

//       setRandomMeal(data);
//     } catch (error) {
//       console.error('Error fetching random meal:', error);
//     }
//   };

//   const addToBanList = (attribute) => {
//     setBanList([...banList, attribute]);
//   };

//   const removeFromBanList = (itemToRemove) => {
//     const updatedBanList = banList.filter((item) => item !== itemToRemove);
//     setBanList(updatedBanList);
//   };

//   const isBanned = (attribute) => {
//     return banList.includes(attribute);
//   };

//   return (
//     <div className="Whole-page">
      
//       <div className="left-container">
//         <h2 className="previous-meals-title">Previous Meals</h2>
//         <ul className="previous-meals-list">
//           {previousMeals.map((meal, index) => (
//             <li key={index}>{meal.strMeal}</li>
//           ))}
//         </ul>
//       </div>
//         <div className="center-container">
//            <h1 className="app-title">Meal Picker</h1>
//           <button className="discover-button" onClick={fetchRandomMeal}>Discover</button>
//           <ContentDisplay meal={randomMeal} isBanned={isBanned} addToBanList={addToBanList} />
//         </div>
//         <div className="right-container">
//           <BanList banList={banList} removeFromBanList={removeFromBanList} />
//         </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentDisplay from './Components/ContentDisplay';
import BanList from './Components/BanList';
import './App.css';

function App() {
  const [randomMeal, setRandomMeal] = useState(null);
  const [banList, setBanList] = useState([]);
  const [previousMeals, setPreviousMeals] = useState([]);

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  const fetchRandomMeal = async () => {
    try {
      let data;
      do {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        data = response.data.meals[0];
      } while (data && (isBanned(data.strCategory) || isBanned(data.strArea) || isBanned(data.strIngredient1)));

      if (data) {
        setPreviousMeals([...previousMeals, data]);
        setRandomMeal(data);
      } else {
        // Handle the case where no suitable meal is found
        console.log('No suitable meal found.');
      }
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  const addToBanList = (attribute) => {
    setBanList([...banList, attribute]);
  };

  const removeFromBanList = (itemToRemove) => {
    const updatedBanList = banList.filter((item) => item !== itemToRemove);
    setBanList(updatedBanList);
  };

  const isBanned = (attribute) => {
    return banList.includes(attribute);
  };

  return (
    <div className="Whole-page">
      <div className="left-container">
        <h2 className="previous-meals-title">Previous Meals</h2>
        <ul className="previous-meals-list">
          {previousMeals.map((meal, index) => (
            <li key={index}>{meal.strMeal}</li>
          ))}
        </ul>
      </div>
      <div className="center-container">
        <h1 className="app-title">Meal Picker</h1>
        <button className="discover-button" onClick={fetchRandomMeal}>Discover</button>
        <ContentDisplay meal={randomMeal} isBanned={isBanned} addToBanList={addToBanList} />
      </div>
      <div className="right-container">
        <BanList banList={banList} removeFromBanList={removeFromBanList} />
      </div>
    </div>
  );
}

export default App;

