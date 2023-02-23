import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getLocalStorageCart, setLocalStorageCart } from "../lib/utils";

export const StateContext = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  increaseQty: () => null,
  decreaseQty: () => null,
  onAdd: (product, quantity) => null,
  onRemove: (product) => null,
  setShowCart: (showCart) => null,
  setCartItems: (items) => null,
  setTotalPrice: () => null,
  setTotalQuantities: () => null,
  toggleCartItemQuantity: (id, action) => null,
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

  useEffect(() => {
    const storedCart = getLocalStorageCart();
    setCartItems(storedCart);
    const qty = storedCart.reduce((total, p) => p.quantity + total, 0);
    const cost = storedCart.reduce(
      (total, p) => p.price * p.quantity + total,
      0
    );
    setTotalQuantities(qty);
    setTotalPrice(cost);
  }, []);

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
      setLocalStorageCart(updatedCartItems);
      toast.success(`${qty} ${product.name} added to the cart.`);
    } else {
      product.quantity = quantity;
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities((prevTotalQty) => prevTotalQty + quantity);
      const updatedCart = [...cartItems, { ...product }];
      setCartItems(updatedCart);
      setLocalStorageCart(updatedCart);
    }
  };

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  const onRemove = (product) => {
    let foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCartItems(newCartItems);
    setLocalStorageCart(newCartItems);
  };

  const toggleCartItemQuantity = (id, action) => {
    // TODO: fix items going out of order
    let foundProduct = cartItems.find((item) => id === item._id);
    let index = cartItems.findIndex((p) => p._id === id);
    const newCartItems = cartItems.filter((item) => id !== item._id);

    if (action === "inc") {
      const updatedCart = [
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ];
      setCartItems(updatedCart);
      setLocalStorageCart(updatedCart);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (action === "dec") {
      const itemQty = foundProduct.quantity - 1;
      let updatedCart;
      if (itemQty < 1) {
        updatedCart = newCartItems;
      } else {
        updatedCart = [
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];
      }
      setCartItems(updatedCart);
      setLocalStorageCart(updatedCart);
      setTotalPrice((prev) => {
        return prev - foundProduct.price < 0 ? 0 : prev - foundProduct.price;
      });
      setTotalQuantities((prev) => prev - 1);
    }
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
    onRemove,
    setShowCart,
    toggleCartItemQuantity,
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
  };
};

export const StateProvider = ({ children }) => {
  const value = useStateProvider();
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
