import { useEffect, useState } from "react";
import api from "../api";

function AdminProviders() {
  const [providers, setProviders] = useState([]);
  const [message, setMessage] = useState("");

  const loadProviders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/providers/admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProviders(response.data);
    } catch (error) {
      setMessage("Could not load providers.");
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  const updateApproval = async (providerId, approvalStatus) => {
    const token = localStorage.getItem("token");

    await api.put(
      `/providers/${providerId}/approval`,
      { approvalStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    loadProviders();
  };

  return (
    <main className="p-6 md:p-10">
      <h1 className="mb-6 text-3xl font-bold">Provider approval</h1>

      {message && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-700">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {providers.map((provider) => (
          <article key={provider._id} className="rounded bg-white p-5 shadow">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold">{provider.businessName}</h2>
                <p className="text-gray-600">
                  {provider.name} - {provider.user?.email}
                </p>
                <p className="text-sm text-gray-500">
                  {provider.location?.city}, {provider.location?.province}
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Status: {provider.approvalStatus}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateApproval(provider._id, "approved")}
                  className="rounded bg-green-600 px-4 py-2 text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateApproval(provider._id, "rejected")}
                  className="rounded bg-red-600 px-4 py-2 text-white"
                >
                  Reject
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {provider.services.map((service) => (
                <div key={service.name} className="rounded border p-3">
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-sm text-gray-500">
                    {service.category?.name}
                  </p>
                  <p className="font-bold">R {service.price}</p>
                </div>
              ))}
            </div>
          </article>
        ))}

        {providers.length === 0 && (
          <p className="rounded bg-white p-5 shadow">
            No provider applications yet.
          </p>
        )}
      </div>
    </main>
  );
}

export default AdminProviders;
