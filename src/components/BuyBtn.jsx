import "./BuyBtn.css";

const BuyBtn = (props) => {
  const addToCart = () => {
    console.log(props.quantity);

    if (props.quantity === 0) {
      return;
    } else {
      console.log(props);
    }
  };
  return (
    <>
      <button onClick={addToCart} className="buy-btn">
        {props.btn}
      </button>
    </>
  );
};

export default BuyBtn;
