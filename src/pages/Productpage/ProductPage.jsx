import Nav from "../../components/Nav";
import "./ProductPage.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BuyBtn from "../../components/BuyBtn";
import Cart from "../Cart/Cart";

const ProductPage = () => {
  const idParams = useParams();
  const [superData, setSuperData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
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
    : superData.filter((elm) => elm.id.toString() === idParams.id);

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
              <p>{detailProducts[0].description}</p>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductPage;
