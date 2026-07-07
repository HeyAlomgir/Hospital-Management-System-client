"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AllDoctorpage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 👉 Fetch Doctors
    useEffect(() => {
        fetch("http://localhost:5000/api/doctors")
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data);
                setLoading(false);
            });
    }, []);

    // 👉 Approve Doctor
    const handleApprove = (id) => {
        fetch(`http://localhost:5000/api/doctors/approve/${id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then(() => {
                // UI update
                const updated = doctors.map((doc) =>
                    doc._id === id ? { ...doc, status: "approved" } : doc
                );
                setDoctors(updated);
            });
    };

    // 👉 Delete Doctor
  const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/doctors/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const remaining = doctors.filter((doc) => doc._id !== id);
                setDoctors(remaining);
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            {/* 🔥 Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Doctors</h2>

                {/* ➕ Add Doctor Button */}
                <button
                    onClick={() => router.push("/dashboard/admin/add-doctor")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Doctor
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
             <div className="overflow-x-auto bg-[#0f172a] p-4 rounded-xl shadow">
    <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-[#1e293b] text-gray-400">
            <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Specialization</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
            </tr>
        </thead>

        <tbody>
            {doctors.map((doc) => (
                <tr
                    key={doc._id}
                    className="border-b border-gray-700 hover:bg-[#1e293b] transition"
                >
                    <td className="px-6 py-4 font-medium text-white">
                        {doc.name}
                    </td>

                    <td className="px-6 py-4">{doc.email}</td>

                    <td className="px-6 py-4">
                        {doc.specialization}
                    </td>

                    {/* ✅ Status Badge */}
                    <td className="px-6 py-4">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                doc.status === "approved"
                                    ? "bg-green-600 text-white"
                                    : "bg-yellow-500 text-black"
                            }`}
                        >
                            {doc.status}
                        </span>
                    </td>

                    {/* ✅ Actions */}
                    <td className="px-6 py-4 flex gap-2 justify-center">
                        {doc.status !== "approved" && (
                            <button
                                onClick={() => handleApprove(doc._id)}
                                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs"
                            >
                                Approve
                            </button>
                        )}

                        <button
                            onClick={() => handleDelete(doc._id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div> 
            )}
        </div>
    );
};

export default AllDoctorpage;