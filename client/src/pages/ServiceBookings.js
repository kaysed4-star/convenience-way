import { useEffect, useState } from "react";
import api from "../api";

function ServiceBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(response.data);
      } catch (err) {
        setError("Could not load your bookings.");
      }
    };

    loadBookings();
  }, []);

  return (
    <main className="p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold">My service bookings</h1>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <article key={booking._id} className="rounded bg-white p-5 shadow">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold">{booking.service.name}</h2>
                <p className="text-gray-600">
                  {booking.provider?.businessName || "Provider"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
                <p className="mt-2 text-sm">
                  {booking.location.address}, {booking.location.city}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-bold">R {booking.service.price}</p>
                <p className="text-sm">Status: {booking.status}</p>
                <p className="text-sm">Payment: {booking.paymentStatus}</p>
              </div>
            </div>
          </article>
        ))}

        {bookings.length === 0 && (
          <p className="rounded bg-white p-5 shadow">
            You do not have service bookings yet.
          </p>
        )}
      </div>
    </main>
  );
}

export default ServiceBookings;
