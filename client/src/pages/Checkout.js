import {
  useContext,
  useState
} from "react";

import {
  CartContext
} from "../context/CartContext";

import api from "../api";

function Checkout() {

const {

  cartItems,

} = useContext(CartContext);

  const [name, setName] =
    useState("");

  const [address,
    setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        item.price * item.quantity,

      0

    );

const checkout =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      // 1. SAVE ORDER

      const orderResponse =
        await api.post(

          "/orders",

          {

            items: cartItems,

            totalAmount:
              totalPrice,

            deliveryDetails: {

              name,
              address,
              phone

            }

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

      const orderId =
        orderResponse.data.order._id;

      // 2. CREATE PAYMENT

      const response =
        await api.post(

          "/payment/payfast",

          {

            amount:
              totalPrice,

            orderId

          }

        );

      // SAVE ORDER ID

      localStorage.setItem(

        "pendingOrderId",

        orderId

      );

      // 3. REDIRECT

      localStorage.setItem(
       "pendingOrderId",
        orderId
        );

      window.location.href =
        response.data.url;

    } catch (error) {

      console.log(error);

      alert(
        "Checkout failed"
      );

    }

};


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
        Checkout
      </h1>

      <div className="
        grid
        md:grid-cols-2
        gap-8
      ">

        {/* DELIVERY FORM */}

        <form

          className="
            bg-white
            p-6
            rounded-xl
            shadow-lg
            space-y-4
          "

        >

          <h2 className="
            text-2xl
            font-bold
          ">
            Delivery Details
          </h2>

          <input

            type="text"

            placeholder="Full Name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="
              w-full
              p-3
              border
              rounded-lg
            "

            required

          />

          <textarea

            placeholder="Delivery Address"

            value={address}

            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }

            className="
              w-full
              p-3
              border
              rounded-lg
            "

            required

          />

          <input

            type="text"

            placeholder="Phone Number"

            value={phone}

            onChange={(e) =>
              setPhone(e.target.value)
            }

            className="
              w-full
              p-3
              border
              rounded-lg
            "

            required

          />

<button

  type="button"

  onClick={checkout}

  className="
    w-full
    bg-black
    text-white
    py-3
    rounded-lg
    hover:bg-gray-800
  "

>

  Proceed To Payment

</button>

        </form>

        {/* ORDER SUMMARY */}

        <div className="
          bg-white
          p-6
          rounded-xl
          shadow-lg
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (

              <div

                key={item._id}

                className="
                  flex
                  justify-between
                  items-center
                "

              >

                <div>

                  <p className="font-bold">
                    {item.name}
                  </p>

                  <p>
                    Qty: {item.quantity}
                  </p>

                </div>

                <p>
                  R {
                    item.price *
                    item.quantity
                  }
                </p>

              </div>

            ))}

          </div>

          <div className="
            border-t
            mt-6
            pt-4
            flex
            justify-between
            text-2xl
            font-bold
          ">

            <span>Total</span>

            <span>
              R {totalPrice}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;