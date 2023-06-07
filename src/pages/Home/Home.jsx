import Btn from "../../components/Btn";
import Nav from "../../components/Nav";
import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [superData, setSuperData] = useState();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((superData) => {
        setSuperData(superData);
      })
      .catch((error) => {
        console.log("Fehler beim laden", error);
      });
  }, []);
  return (
    <section>
      <Nav />
      <header>
        <section className="header-container">
          <div className="header-divider-one">
            <h1>Nice Deals</h1>
            <h3>Hier findest du die besten Deals</h3>
            <Link to="./allproducts">
              <Btn name="Shop Now"></Btn>
            </Link>
          </div>
          <div className="header-divider-two"></div>
        </section>
      </header>
      <main>
        <section className="about-us-container">
          <h2>What We Do</h2>
          <p>
            Willkommen in unserem Online-Shop! Hier finden Sie eine breite
            Palette von Produkten zu attraktiven Preisen. Unser Sortiment
            umfasst eine Vielzahl von Artikeln, um alle Ihre Bedürfnisse und
            Interessen abzudecken. Egal, ob Sie auf der Suche nach modischen
            Trends, elektronischen Gadgets, Haushaltsgeräten oder Sportartikeln
            sind, bei uns werden Sie fündig. Unser Produktangebot wird
            sorgfältig ausgewählt, um den Anforderungen und Vorlieben unserer
            geschätzten Kunden gerecht zu werden.
          </p>
          <Link to="./allproducts">
            <Btn name="Learn More"></Btn>
          </Link>
        </section>

        {superData ? (
          <section className="our-products">
            <h2>Unsere Produkte</h2>
            <section className="product-grid">
              {superData.map((products, index) => (
                <div className="shop-item" key={index}>
                  <Link to={`/product/${products.id}`}>
                    <img src={products.image} alt={products.title}></img>
                  </Link>
                  <p className="products-title">{products.title}</p>
                  <p className="products-price">
                    {products.price} €
                    <span className="sale-price">{products.price * 2}€</span>{" "}
                  </p>
                </div>
              ))}
            </section>
          </section>
        ) : (
          <p>Daten werden geladen ...</p>
        )}
      </main>
    </section>
  );
};
export default Home;
