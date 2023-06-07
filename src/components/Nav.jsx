import { Link, NavLink } from "react-router-dom";
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
    <>
      <section className="benefits-container">
        <div className="benefit-one">
          <p>Kostenlose Lieferung ab 50€</p>
        </div>
        <div className="benefit-two">
          <p>Mindestens 40% auf alles</p>
        </div>
        <div className="benefit-three">
          <p>Kostenlose Retouren</p>
        </div>
      </section>
      <nav>
        <Link>
          <h2>SuperSales</h2>
        </Link>
        <section className="menu-items-container">
          <NavLink to="/">Home</NavLink>
          {superData ? (
            <section className="menu-items">
              {superData.map((category, index) => (
                <NavLink key={index} to={`/category/${category}`}>
                  {translatedCategories[index]}
                </NavLink>
              ))}
            </section>
          ) : (
            <p>Daten werden geladen ...</p>
          )}{" "}
        </section>

        <NavLink to="/cart">Warenkorb</NavLink>
      </nav>
    </>
  );
};

export default Nav;
