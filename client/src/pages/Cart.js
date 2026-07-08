import {
  useContext
} from "react";

import {
  CartContext
} from "../context/CartContext";

import { Link } from "react-router-dom";

function Cart() {

  const {

    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity

  } = useContext(CartContext);

  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        item.price * item.quantity,

      0

    );

  return (

    <div className="
      p-8
      bg-gray-100
      min-h-screen
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (

        <p>
          Cart is empty
        </p>

      ) : (

        <div className="space-y-6">

          {cartItems.map((item) => (

            <div

              key={item._id}

              className="
                bg-white
                p-5
                rounded-xl
                shadow-md
                flex
                items-center
                justify-between
              "

            >

              <div className="
                flex
                items-center
                gap-4
              ">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-24
                    h-24
                    object-cover
                    rounded-lg
                  "
                />

                <div>

                  <h2 className="
                    text-2xl
                    font-bold
                  ">
                    {item.name}
                  </h2>

                  <p>
                    R {item.price}
                  </p>

                </div>

              </div>

              <div className="
                flex
                items-center
                gap-3
              ">

                <button

                  onClick={() =>
                    decreaseQuantity(item._id)
                  }

                  className="
                    bg-gray-300
                    px-3
                    py-1
                    rounded
                  "

                >
                  -
                </button>

                <span className="
                  text-xl
                  font-bold
                ">
                  {item.quantity}
                </span>

                <button

                  onClick={() =>
                    increaseQuantity(item._id)
                  }

                  className="
                    bg-gray-300
                    px-3
                    py-1
                    rounded
                  "

                >
                  +
                </button>

              </div>

              <div>

                <p className="
                  text-xl
                  font-bold
                ">
                  R {
                    item.price *
                    item.quantity
                  }
                </p>

                <button

                  onClick={() =>
                    removeFromCart(item._id)
                  }

                  className="
                    mt-2
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "

                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          <div className="
            bg-white
            p-6
            rounded-xl
            shadow-lg
          ">

            <h2 className="
              text-3xl
              font-bold
            ">
              Total:
              R {totalPrice}
            </h2>

<Link to="/checkout">

  <button className="
    mt-4
    bg-black
    text-white
    px-6
    py-3
    rounded-lg
    hover:bg-gray-800
  ">

    Checkout

  </button>

</Link>  

          </div>

        </div>

      )}

    </div>

  );

}

export default Cart;