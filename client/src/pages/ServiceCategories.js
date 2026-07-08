import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMarketplace = async () => {
      try {
        const [categoryResponse, providerResponse] = await Promise.all([
          api.get("/service-categories"),
          api.get("/providers")
        ]);

        setCategories(categoryResponse.data);
        setProviders(providerResponse.data);
      } catch (err) {
        setError("Could not load services right now.");
      } finally {
        setLoading(false);
      }
    };

    loadMarketplace();
  }, []);

  const filteredProviders =
    selectedCategory === "all"
      ? providers
      : providers.filter((provider) =>
          provider.services.some(
            (service) => service.category?._id === selectedCategory
          )
        );

  return (
    <main className="p-6 md:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Find local services</h1>
          <p className="mt-2 text-gray-600">
            Browse verified providers by category, pricing, and location.
          </p>
        </div>

        <Link
          to="/provider-onboarding"
          className="rounded bg-black px-4 py-3 text-center text-white"
        >
          Become a provider
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`whitespace-nowrap rounded border px-4 py-2 ${
            selectedCategory === "all"
              ? "border-black bg-black text-white"
              : "bg-white"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className={`whitespace-nowrap rounded border px-4 py-2 ${
              selectedCategory === category._id
                ? "border-black bg-black text-white"
                : "bg-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <article
              key={provider._id}
              className="rounded bg-white p-5 shadow"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold">{provider.businessName}</h2>
                <p className="text-gray-600">{provider.name}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {provider.location?.city || "Location not listed"}
                  {provider.location?.province
                    ? `, ${provider.location.province}`
                    : ""}
                </p>
              </div>

              <div className="mb-5 space-y-3">
                {provider.services.map((service) => (
                  <div
                    key={`${provider._id}-${service.name}`}
                    className="rounded border p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-gray-500">
                          {service.category?.name}
                        </p>
                      </div>
                      <p className="font-bold">R {service.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={`/book/${provider._id}`}
                className="block rounded bg-black px-4 py-3 text-center text-white"
              >
                Book provider
              </Link>
            </article>
          ))}

          {filteredProviders.length === 0 && (
            <p className="rounded bg-white p-5 shadow">
              No approved providers found for this category yet.
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default ServiceCategories;
