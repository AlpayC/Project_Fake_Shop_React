import Nav from "../../components/Nav";
import "./ProductPage.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BuyBtn from "../../components/BuyBtn";
import Cart from "../Cart/Cart";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ProductPage = () => {
  const idParams = useParams();
  const [superData, setSuperData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((superData) => {
        console.log(superData);
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
    : superData.filter((elm) => elm.id.toString() === idParams.id);

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
          <section className="product-container">
            <img src={detailProducts[0].image}></img>
            <div className="product-detail-container">
              <div className="product-rating-container">
                <h3>
                  {renderStars(detailProducts[0].rating.rate)}
                  {detailProducts[0].rating.rate} Sterne
                </h3>
                <h3>{detailProducts[0].rating.count} Bewertungen</h3>
              </div>

              <h1>{detailProducts[0].title}</h1>
              <h2>{detailProducts[0].price} €</h2>
              <div className="quantity-container">
                <h2>Anzahl: </h2>{" "}
                <input
                  type="number"
                  name=""
                  id=""
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="btn-container">
                <BuyBtn btn={"In den Warenkorb"} quantity={quantity} />
                <Link to="../cart">
                  <BuyBtn
                    btn={"Kasse"}
                    quantity={quantity}
                    imgurl={detailProducts[0].image}
                    producttitle={detailProducts[0].title}
                    productprice={detailProducts[0].price}
                  />
                </Link>
              </div>
              <h2>Beschreibung</h2>
              <p>{detailProducts[0].description}</p>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductPage;
