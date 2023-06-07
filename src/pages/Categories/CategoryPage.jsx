import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CategoryPage.css";

const CategoryPage = () => {
  const idParams = useParams();
  const [superData, setSuperData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((superData) => {
        setSuperData(superData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
        setIsLoading(false);
      });
  }, []);

  const detailProducts = isLoading
    ? []
    : superData.filter((elm) => elm.category.toString() === idParams.category);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i className="fas fa-star" key={i}></i>);
      } else {
        stars.push(<i className="far fa-star" key={i}></i>);
      }
    }

    return stars;
  };

  return (
    <>
      <Nav />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{detailProducts[0].category}</h1>
          {detailProducts ? (
            <section className="product-grid">
              {detailProducts.map((products, index) => (
                <div className="shop-item" key={index}>
                  <Link to={`/product/${products.id}`}>
                    <img src={products.image} alt={products.title} />
                  </Link>
                  <p className="stars-home">
                    {renderStars(products.rating.rate)}
                  </p>
                  <p>{products.title}</p>
                  <p>{products.price} €</p>
                </div>
              ))}
            </section>
          ) : (
            <p>Daten werden geladen ...</p>
          )}
        </>
      )}
    </>
  );
};

export default CategoryPage;
