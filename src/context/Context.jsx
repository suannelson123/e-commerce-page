import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { thumnails, products } from "../constant";

export const ProductItem = createContext(null);

const Product = ({ children }) => {
  const [productCart, setProductCart] = useState([]);

  const addToCart = () => {
    const obj = {
      title: "Fall Limited Edition Sneakers",
      quantity: 1,
      price: 125.0,
      imgSrc: thumnails[0],
    };
    setProductCart((prev) => {
      const productExists = prev.find((item) => item.title === obj.title);
      if (!productExists) {
        return [...prev, obj];
      } else {
        return prev.map((item) =>
          item.title === obj.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  };

  const removeToCart = (itemTitle) => {
    setProductCart((prev) => {
      const removeThisItem = prev.filter((item) => item.title !== itemTitle);
      return removeThisItem;
    });
  };

  const incrementDecrement = (increment) => {
    setProductCart((prev) => {
      const updatedItems = prev
        .map((pr) => ({
          ...pr,
          quantity: increment ? pr.quantity + 1 : Math.max(pr.quantity - 1, 0),
        }))
        .filter((pr) => pr.quantity > 0);

      return updatedItems;
    });
  };

  return (
    <ProductItem.Provider
      value={{
        productCart,
        setProductCart,
        thumnails,
        products,
        addToCart,
        removeToCart,
        incrementDecrement,
      }}
    >
      {children}
    </ProductItem.Provider>
  );
};
Product.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Product;
