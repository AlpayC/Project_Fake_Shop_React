import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useEffect, useState } from "react";

const Nav = () => {
  const [superData, setSuperData] = useState();
  const [translatedCategories, setTranslatedCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((superData) => {
        setSuperData(superData);
        translateCategories(superData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, []);
  const translateCategories = (categories) => {
    const translations = {
      electronics: "Elektronik",
      jewelery: "Schmuck",
      "men's clothing": "Herren Kleidung",
      "women's clothing": "Frauen Kleidung",
    };

    const translated = categories.map(
      (category) => translations[category] || category
    );
    setTranslatedCategories(translated);
  };
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {superData ? (
        <>
          {superData.map((category, index) => (
            <NavLink key={index} to={`/category/${category}`}>
              {translatedCategories[index]}
            </NavLink>
          ))}
        </>
      ) : (
        <p>Daten werden geladen ...</p>
      )}
      <NavLink to="/cart">Warenkorb</NavLink>
    </nav>
  );
};

export default Nav;
