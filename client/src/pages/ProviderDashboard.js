import { useEffect, useState } from "react";
import api from "../api";

function ProviderDashboard() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const loadBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/bookings/provider-bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookings(response.data);
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not load provider bookings.");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (bookingId, status) => {
    const token = localStorage.getItem("token");

    await api.put(
      `/bookings/${bookingId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    loadBookings();
  };

  return (
    <main className="p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold">Provider dashboard</h1>

      {message && (
        <div className="mb-6 rounded border bg-gray-50 p-4">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <article key={booking._id} className="rounded bg-white p-5 shadow">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold">{booking.service.name}</h2>
                <p className="text-gray-600">
                  Customer: {booking.customer?.name || "Customer"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
                <p className="mt-2 text-sm">
                  {booking.location.address}, {booking.location.city}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["accepted", "declined", "in_progress", "completed"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(booking._id, status)}
                      className="rounded border px-3 py-2 text-sm"
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold">
              Current status: {booking.status}
            </p>
          </article>
        ))}

        {bookings.length === 0 && !message && (
          <p className="rounded bg-white p-5 shadow">
            No provider bookings yet.
          </p>
        )}
      </div>
    </main>
  );
}

export default ProviderDashboard;
