import {
  createContext,
  useState,
  useEffect
} from "react";

export const CartContext =
  createContext();

export const CartProvider =
  ({ children }) => {

const [cartItems,
  setCartItems] =
  useState(() => {

    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

const addToCart =
  (product) => {

    const existingItem =
      cartItems.find(
        (item) =>
          item._id === product._id
      );

    if (existingItem) {

      const updatedCart =
        cartItems.map((item) =>

          item._id === product._id

            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }

            : item

        );

      setCartItems(updatedCart);

    } else {

      setCartItems([

        ...cartItems,

        {
          ...product,
          quantity: 1
        }

      ]);

    }

};

const increaseQuantity =
  (id) => {

    const updatedCart =
      cartItems.map((item) =>

        item._id === id

          ? {
              ...item,
              quantity:
                item.quantity + 1
            }

          : item

      );

    setCartItems(updatedCart);

};

const decreaseQuantity =
  (id) => {

    const updatedCart =
      cartItems.map((item) =>

        item._id === id

          ? {
              ...item,
              quantity:
                item.quantity - 1
            }

          : item

      ).filter(
        (item) =>
          item.quantity > 0
      );

    setCartItems(updatedCart);

};

const removeFromCart =
  (id) => {

    const updatedCart =
      cartItems.filter(
        (item) =>
          item._id !== id
      );

    setCartItems(updatedCart);

};

const clearCart = () => {

  setCartItems([]);

};

useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

}, [cartItems]);

    return (

      <CartContext.Provider
value={{

  cartItems,

  addToCart,

  increaseQuantity,

  decreaseQuantity,

  removeFromCart,
  
  clearCart

}}
      >

        {children}

      </CartContext.Provider>

    );

};