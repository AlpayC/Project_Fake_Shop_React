import Nav from "../../components/Nav";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
