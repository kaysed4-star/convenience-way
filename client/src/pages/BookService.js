import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function BookService() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [form, setForm] = useState({
    date: "",
    time: "",
    address: "",
    city: "",
    province: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/providers/${providerId}`).then((response) => {
      setProvider(response.data);
    });
  }, [providerId]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const selectedService = provider.services[selectedServiceIndex];

      await api.post(
        "/bookings",
        {
          provider: provider._id,
          service: {
            category: selectedService.category._id,
            name: selectedService.name,
            price: selectedService.price
          },
          date: form.date,
          time: form.time,
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

      navigate("/service-bookings");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not create booking.");
    }
  };

  if (!provider) {
    return <main className="p-10">Loading provider...</main>;
  }

  return (
    <main className="p-6 md:p-10">
      <div className="mx-auto max-w-3xl rounded bg-white p-6 shadow">
        <h1 className="text-3xl font-bold">Book {provider.businessName}</h1>
        <p className="mt-2 text-gray-600">
          Choose a service, date, time, and service address.
        </p>

        {message && (
          <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
            {message}
          </div>
        )}

        <form onSubmit={submitBooking} className="mt-6 space-y-5">
          <select
            value={selectedServiceIndex}
            onChange={(event) =>
              setSelectedServiceIndex(Number(event.target.value))
            }
            className="w-full rounded border p-3"
          >
            {provider.services.map((service, index) => (
              <option key={service.name} value={index}>
                {service.name} - R {service.price}
              </option>
            ))}
          </select>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              type="date"
              value={form.date}
              onChange={(event) => updateField("date", event.target.value)}
              className="rounded border p-3"
            />
            <input
              required
              type="time"
              value={form.time}
              onChange={(event) => updateField("time", event.target.value)}
              className="rounded border p-3"
            />
          </div>

          <input
            required
            placeholder="Service address"
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className="w-full rounded border p-3"
          />

          <div className="grid gap-4 md:grid-cols-2">
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
              className="rounded border p-3"
            />
          </div>

          <button className="w-full rounded bg-black p-3 text-white">
            Request booking
          </button>
        </form>
      </div>
    </main>
  );
}

export default BookService;
