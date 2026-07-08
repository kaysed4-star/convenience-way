import {
  useEffect,
  useContext
} from "react";

import api from "../api";

import {
  CartContext
} from "../context/CartContext";

function Success() {

  const { clearCart } =
    useContext(CartContext);

  useEffect(() => {

    const finalizePayment =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const orderId =
            localStorage.getItem(
              "pendingOrderId"
            );

          await api.put(

            `/orders/${orderId}/pay`,

            {},

            {

              headers: {

                Authorization:
                  `Bearer ${token}`

              }

            }

          );

          clearCart();

          localStorage.removeItem(
            "pendingOrderId"
          );

        } catch (error) {

          console.log(error);

        }

    };

    finalizePayment();

  }, [clearCart]);

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold">

        Payment Successful 🎉

      </h1>

    </div>

  );

}

export default Success;