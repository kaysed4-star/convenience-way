import {
  useState,
  useEffect
} from "react";

import api from "../api";

function Admin() {

  // CREATE STATES

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [image, setImage] =
    useState(null);

  // PRODUCTS

  const [products,
    setProducts] =
    useState([]);

  // EDIT STATES

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  const [editName,
    setEditName] =
    useState("");

  const [editPrice,
    setEditPrice] =
    useState("");

  const [editDescription,
    setEditDescription] =
    useState("");

  // FETCH PRODUCTS

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        const response =
          await api.get(
            "/products"
          );

        setProducts(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // CREATE PRODUCT

  const createProduct =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        const uploadResponse =
          await api.post(
            "/upload",
            formData
          );

        const imageUrl =
          uploadResponse.data.imageUrl;

        await api.post(

          "/products",

          {
            name,
            price,
            description,
            image: imageUrl
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Product created!"
        );

        fetchProducts();

        setName("");
        setPrice("");
        setDescription("");
        setImage(null);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create product"
        );

      }

    };

  // DELETE PRODUCT

  const deleteProduct =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.delete(

          `/products/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );

      }

    };

  // START EDITING

  const startEditing =
    (product) => {

      setEditingProduct(
        product._id
      );

      setEditName(
        product.name
      );

      setEditPrice(
        product.price
      );

      setEditDescription(
        product.description
      );

    };

  // UPDATE PRODUCT

  const updateProduct =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(

          `/products/${id}`,

          {
            name: editName,
            price: editPrice,
            description:
              editDescription
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        setEditingProduct(
          null
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Update failed"
        );

      }

    };

  return (

    <div className="
      p-10
      max-w-4xl
      mx-auto
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Admin Dashboard
      </h1>

      {/* CREATE FORM */}

      <form
        onSubmit={createProduct}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Product Name"
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
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="
            w-full
            p-3
            border
            rounded-lg
          "
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="
            w-full
            p-3
            border
            rounded-lg
          "
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          className="
            w-full
            p-3
            border
            rounded-lg
          "
        />

        <button
          type="submit"
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Create Product
        </button>

      </form>

      {/* PRODUCTS */}

      <div className="mt-10 space-y-4">

        {products.map((product) => (

          <div

            key={product._id}

            className="
              bg-white
              p-4
              rounded-lg
              shadow
              flex
              justify-between
              items-center
            "

          >

            <div className="
              flex
              items-center
              gap-4
            ">

              <img
                src={product.image}
                alt={product.name}
                className="
                  w-20
                  h-20
                  object-cover
                  rounded-lg
                "
              />

              <div>

                <h2 className="
                  text-xl
                  font-bold
                ">
                  {product.name}
                </h2>

                <p>
                  R {product.price}
                </p>

              </div>

            </div>

            <div className="flex gap-2">

              <button

                onClick={() =>
                  startEditing(product)
                }

                className="
                  bg-blue-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "

              >

                Edit

              </button>

              <button

                onClick={() =>
                  deleteProduct(product._id)
                }

                className="
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "

              >

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* EDIT FORM */}

      {editingProduct && (

        <div className="
          mt-10
          bg-white
          p-6
          rounded-xl
          shadow-lg
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-6
          ">
            Edit Product
          </h2>

          <input

            type="text"

            value={editName}

            onChange={(e) =>
              setEditName(
                e.target.value
              )
            }

            className="
              w-full
              p-3
              border
              rounded-lg
              mb-4
            "

          />

          <input

            type="number"

            value={editPrice}

            onChange={(e) =>
              setEditPrice(
                e.target.value
              )
            }

            className="
              w-full
              p-3
              border
              rounded-lg
              mb-4
            "

          />

          <textarea

            value={editDescription}

            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }

            className="
              w-full
              p-3
              border
              rounded-lg
              mb-4
            "

          />

          <button

            onClick={() =>
              updateProduct(
                editingProduct
              )
            }

            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-lg
            "

          >

            Save Changes

          </button>

        </div>

      )}

    </div>

  );

}

export default Admin;