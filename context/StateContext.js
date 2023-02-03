import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const StateContext = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  increaseQty: () => null,
  decreaseQty: () => null,
  onAdd: (product, quantity) => null,
  setShowCart: (showCart) => null,
});

export const useStateContext = () => {
  let context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};

const useStateProvider = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantities, setTotalQuantities] = useState(0);

  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id == product._id
    );

    // if item already exists in the cart, update the quantity and total price
    if (checkProductInCart) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities((prevTotalQty) => prevTotalQty + quantity);
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added to the cart.`);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  };

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  return {
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    increaseQty,
    decreaseQty,
    onAdd,
    setShowCart,
  };
};

export const StateProvider = ({ children }) => {
  const value = useStateProvider();
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};