import {
  useEffect,
  useState
} from "react";

import api from "../api";

function Orders() {

  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await api.get(

              "/orders/myorders",

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

    fetchOrders();

  }, []);

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
        My Orders
      </h1>

      {orders.length === 0 ? (

        <p>
          No orders yet
        </p>

      ) : (

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
                shadow-lg
              "

            >

              <h2 className="
                text-2xl
                font-bold
                mb-4
              ">

                Order ID:
                {order._id}

              </h2>

              <p className="
                mb-4
                text-gray-500
              ">

                {new Date(
                  order.createdAt
                ).toLocaleString()}

              </p>

              <div className="
                space-y-3
              ">

                {order.items.map(
                  (item, index) => (

                  <div

                    key={index}

                    className="
                      flex
                      justify-between
                    "

                  >

                    <span>

                      {item.name}
                      x
                      {item.quantity}

                    </span>

                    <span>

                      R {
                        item.price *
                        item.quantity
                      }

                    </span>

                  </div>

                ))}

              </div>

              <div className="
                border-t
                mt-4
                pt-4
                text-2xl
                font-bold
                flex
                justify-between
              ">

                <span>Total</span>

                <span>
                  R {order.totalAmount}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Orders;