import {
  useEffect,
  useState
} from "react";

import api from "../api";

function MyOrders() {

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

  return (

    <div className="
      p-10
      min-h-screen
      bg-gray-100
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        My Orders
      </h1>

      <div className="space-y-6">

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

            <div className="
              flex
              justify-between
              mb-4
            ">

              <p className="font-bold">
                Order ID:
                {order._id}
              </p>

              <p className="
                text-green-600
                font-bold
              ">
                R {order.totalAmount}
              </p>

            </div>

            <div className="space-y-2">

              {order.items.map((item) => (

                <div

                  key={item._id}

                  className="
                    flex
                    justify-between
                  "

                >

                  <p>
                    {item.name}
                    ×
                    {item.quantity}
                  </p>

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
              mt-4
              pt-4
              text-sm
              text-gray-600
            ">

              <p>
                Delivery To:
                {" "}
                {
                  order.deliveryDetails.name
                }
              </p>

              <p>
                {
                  order.deliveryDetails.address
                }
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MyOrders;