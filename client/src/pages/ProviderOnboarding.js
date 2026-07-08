import { useEffect, useState } from "react";
import api from "../api";

const emptyService = {
  category: "",
  name: "",
  description: "",
  price: ""
};

function ProviderOnboarding() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    documentType: "ID",
    documentUrl: "",
    address: "",
    city: "",
    province: "",
    service: emptyService
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/service-categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const updateService = (field, value) => {
    setForm((current) => ({
      ...current,
      service: {
        ...current.service,
        [field]: value
      }
    }));
  };

  const submitProvider = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/providers",
        {
          name: form.name,
          businessName: form.businessName,
          documents: [
            {
              type: form.documentType,
              url: form.documentUrl
            }
          ],
          services: [
            {
              ...form.service,
              price: Number(form.service.price)
            }
          ],
          location: {
            address: form.address,
            city: form.city,
            province: form.province
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Provider application submitted. Admin approval is required before customers can book you.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not submit provider application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-3xl rounded bg-white p-6 shadow">
        <h1 className="text-3xl font-bold">Provider onboarding</h1>
        <p className="mt-2 text-gray-600">
          Create your provider profile and submit it for verification.
        </p>

        {message && (
          <div className="mt-6 rounded border bg-gray-50 p-4">
            {message}
          </div>
        )}

        <form onSubmit={submitProvider} className="mt-6 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              placeholder="Your full name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded border p-3"
            />
            <input
              required
              placeholder="Business name"
              value={form.businessName}
              onChange={(event) =>
                updateField("businessName", event.target.value)
              }
              className="rounded border p-3"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={form.documentType}
              onChange={(event) =>
                updateField("documentType", event.target.value)
              }
              className="rounded border p-3"
            >
              <option value="ID">ID</option>
              <option value="Business Registration">Business Registration</option>
              <option value="Proof of Address">Proof of Address</option>
            </select>
            <input
              required
              placeholder="Document URL"
              value={form.documentUrl}
              onChange={(event) =>
                updateField("documentUrl", event.target.value)
              }
              className="rounded border p-3"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <input
              required
              placeholder="Address"
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              className="rounded border p-3 md:col-span-3"
            />
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(event) => updateField("city", event.target.value)}
              className="rounded border p-3"
            />
            <input
              required
              placeholder="Province"
              value={form.province}
              onChange={(event) => updateField("province", event.target.value)}
              className="rounded border p-3 md:col-span-2"
            />
          </div>

          <div className="rounded border p-4">
            <h2 className="mb-4 text-xl font-bold">First service</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                required
                value={form.service.category}
                onChange={(event) =>
                  updateService("category", event.target.value)
                }
                className="rounded border p-3"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                required
                placeholder="Service name"
                value={form.service.name}
                onChange={(event) => updateService("name", event.target.value)}
                className="rounded border p-3"
              />
              <input
                required
                type="number"
                min="0"
                placeholder="Price"
                value={form.service.price}
                onChange={(event) => updateService("price", event.target.value)}
                className="rounded border p-3"
              />
              <input
                placeholder="Short description"
                value={form.service.description}
                onChange={(event) =>
                  updateService("description", event.target.value)
                }
                className="rounded border p-3"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-black p-3 text-white disabled:bg-gray-400"
          >
            {submitting ? "Submitting..." : "Submit for approval"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default ProviderOnboarding;
