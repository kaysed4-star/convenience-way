import {
  useEffect,
  useState
} from "react";

import api from "../api";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await api.get(

            "/orders",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`

              }

            }

          );

        setOrders(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

  };

  const markDelivered =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(

          `/orders/${id}/deliver`,

          {},

          {

            headers: {

              Authorization:
                `Bearer ${token}`

            }

          }

        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update order"
        );

      }

  };

  return (

    <div className="
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Admin Orders
      </h1>

      <div className="
        space-y-6
      ">

        {orders.map((order) => (

          <div

            key={order._id}

            className="
              bg-white
              p-6
              rounded-xl
              shadow
            "

          >

            <p>
              <strong>Name:</strong>
              {" "}
              {
                order.deliveryDetails.name
              }
            </p>

            <p>
              <strong>Total:</strong>
              {" "}
              R {order.totalAmount}
            </p>

            <p>

               <strong>Payment:</strong>

                {" "}

              {order.isPaid
                ? "Paid"
                : "Pending"}

            </p>

            <p>
              <strong>Address:</strong>
              {" "}
              {
                order.deliveryDetails.address
              }
            </p>

            <p>
              <strong>Status:</strong>
              {" "}

              {order.isDelivered
                ? "Delivered"
                : "Pending"}

            </p>

            {!order.isDelivered && (

              <button

                onClick={() =>
                  markDelivered(
                    order._id
                  )
                }

                className="
                  mt-4
                  bg-green-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "

              >

                Mark Delivered

              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default AdminOrders;