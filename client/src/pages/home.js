import {
  useEffect,
  useState
} from "react";

import api from "../api";

import {
  useContext
} from "react";

import {
  CartContext
} from "../context/CartContext";

function Home() {

  const [products, setProducts] =
    useState([]);

  const { addToCart } =
  useContext(CartContext);  

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response =
        await api.get(
          "/products"
        );

      console.log(response.data);

      setProducts(response.data);

      

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{products.map((product) => (

  <div
    key={product._id}
    className="
      bg-white
      rounded-xl
      shadow-lg
      overflow-hidden
      hover:scale-105
      transition
      duration-300
    "
  >

    <img
      src={product.image}
      alt={product.name}
      className="
        w-full
        h-56
        object-cover
      "
    />

    <div className="p-5">

      <h2 className="text-2xl font-bold mb-2">
        {product.name}
      </h2>

      <p className="text-gray-600 mb-4">
        {product.description}
      </p>

      <div className="
        flex
        justify-between
        items-center
      ">

        <p className="text-2xl font-bold">
          R{product.price}
        </p>

<button

  onClick={() =>
    addToCart(product)
  }

  className="
    bg-black
    text-white
    px-4
    py-2
    rounded-lg
    hover:bg-gray-800
  "
>
          Add To Cart
        </button>

      </div>

    </div>

  </div>

))}

      </div>

    </div>

  );

}

export default Home;