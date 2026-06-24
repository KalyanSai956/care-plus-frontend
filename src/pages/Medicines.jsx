import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";


function Medicines() {
const [medicines, setMedicines] = useState([]);
const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);
const [editMode, setEditMode] =
  useState(false);
const user = JSON.parse(
  localStorage.getItem("user")
);
const [selectedMedicineId,
  setSelectedMedicineId] =
  useState(null);
  const [categoryFilter,
  setCategoryFilter] =
  useState("");

const [stockFilter,
  setStockFilter] =
  useState("");

const [formData, setFormData] = useState({
name: "",
genericName: "",
category: "",
stockQuantity: "",
unitPrice: "",
batchNumber: "",
manufacturer: "",
expiryDate: "",
supplier: "",
});

useEffect(() => {
fetchMedicines();
}, []);

const fetchMedicines = async () => {
try {
const response = await API.get("/medicines");
setMedicines(response.data.medicines);
} catch (error) {
console.error(error);
}
};

const handleAddMedicine = async (e) => {
e.preventDefault();

try {
  await API.post("/medicines", formData);

  alert("Medicine Added Successfully");

  setShowModal(false);

  setFormData({
    name: "",
    genericName: "",
    category: "",
    stockQuantity: "",
    unitPrice: "",
    batchNumber: "",
    manufacturer: "",
    expiryDate: "",
    supplier: "",
  });

  fetchMedicines();
} catch (error) {
  console.error(error);
  alert("Failed to add medicine");
}


};
const handleDelete = async (
  id
) => {
  const confirmDelete =
    window.confirm(
      "Delete this medicine?"
    );

  if (!confirmDelete) return;

  try {
    await API.delete(
      `/medicines/${id}`
    );

    fetchMedicines();

    alert(
      "Medicine deleted successfully"
    );
  } catch (error) {
    console.error(error);
  }
};
const handleUpdateMedicine =
  async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/medicines/${selectedMedicineId}`,
        formData
      );

      alert(
        "Medicine Updated Successfully"
      );

      setShowModal(false);

      setEditMode(false);

      fetchMedicines();
    } catch (error) {
      console.error(error);
    }
  };
  return (
  <Layout>
  <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">


  <div className="bg-white/70 backdrop-blur-xl shadow-xl border border-emerald-100 p-6">
   <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center mb-4">
      <input
        type="text"
        placeholder="Search medicines..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      className="border border-blue-200
focus:border-blue-600
focus:ring-blue-200 focus:ring-2
rounded-xl p-3 w-full md:w-1/2 outline-none"
      />

   {user?.role === "admin" && (
  <button
    onClick={() =>
      setShowModal(true)
    }
    className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg hover:shadow-2xl hover:scale-105 duration-300 text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
  >
    Add Medicine
  </button>
)}
   </div>

<div className="flex flex-col md:flex-row gap-4 mb-4">

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(
        e.target.value
      )
    }
   className="border p-3 rounded-xl w-full md:w-auto"
  >
    <option value="">
      All Categories
    </option>

    <option value="Tablet">
      Tablet
    </option>

    <option value="Capsule">
      Capsule
    </option>

    <option value="Syrup">
      Syrup
    </option>

    <option value="Injection">
      Injection
    </option>
  </select>

  <select
    value={stockFilter}
    onChange={(e) =>
      setStockFilter(
        e.target.value
      )
    }
   className="border p-3 rounded-xl w-full md:w-auto"
  >
    <option value="">
      All Stock
    </option>

    <option value="low">
      Low Stock
    </option>

    <option value="expiring">
      Expiring Soon
    </option>
  </select>

  <button
    onClick={() => {
      setSearch("");
      setCategoryFilter("");
      setStockFilter("");
    }}
   className="bg-gray-500 text-white px-4 py-3 rounded-xl w-full md:w-auto"
  >
    Reset Filters
  </button>

</div>

<div className="overflow-x-auto">
  <table className="hidden md:table w-full">
   <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
  <tr className="border-b border-emerald-50 hover:bg-emerald-50/60 transition duration-200">
    <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
      Name
    </th>

    <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
      Category
    </th>

    <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
      Stock
    </th>

    <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
      Price
    </th>

    <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
      Expiry Date
    </th>

    <th className="p-4 text-left text-indigo-900 font-semibold uppercase tracking-wide text-sm">
      Actions
    </th>
  </tr>
</thead>

        <tbody className="bg-white/40 backdrop-blur-md">
          {medicines
            .filter((medicine) => {

  const matchesSearch =
    medicine.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchesCategory =
    !categoryFilter ||
    medicine.category ===
      categoryFilter;

  const matchesStock =
    !stockFilter ||

    (stockFilter === "low" &&
      medicine.stockQuantity < 10) ||

    (stockFilter === "expiring" &&
      new Date(
        medicine.expiryDate
      ) <
        new Date(
          Date.now() +
            180 *
              24 *
              60 *
              60 *
              1000
        ));

  return (
    matchesSearch &&
    matchesCategory &&
    matchesStock
  );
})
            .map((medicine) => {
              const isExpiringSoon =
                new Date(
                  medicine.expiryDate
                ) <
                new Date(
                  Date.now() +
                    180 *
                      24 *
                      60 *
                      60 *
                      1000
                );

              return (
                <tr
                  key={medicine._id}
                  className="border-b border-blue-100 hover:bg-blue-50 transition-all duration-300"
                >
                  <td className="p-3 font-medium">
                    {medicine.name}
                  </td>

                  <td className="p-3">
                    {medicine.category}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        medicine.stockQuantity <
                        10
                          ? "bg-red-500"
                          : "bg-gradient-to-r from-blue-500 to-indigo-600"
                      }`}
                    >
                      {
                        medicine.stockQuantity
                      }
                    </span>
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      medicine.unitPrice
                    }
                  </td>

              <td className="p-3">
  <span
    className={`px-2 py-1 rounded ${
      isExpiringSoon
        ? "bg-amber-100 text-amber-800 font-medium"
        : ""
    }`}
  >
    {new Date(
      medicine.expiryDate
    ).toLocaleDateString()}
  </span>
</td>

<td className="p-3">
  <div className="flex gap-2">

    <button
  onClick={() => {
    setEditMode(true);

    setSelectedMedicineId(
      medicine._id
    );

    setFormData({
      name: medicine.name,
      genericName:
        medicine.genericName || "",
      category:
        medicine.category || "",
      stockQuantity:
        medicine.stockQuantity || "",
      unitPrice:
        medicine.unitPrice || "",
      batchNumber:
        medicine.batchNumber || "",
      manufacturer:
        medicine.manufacturer || "",
      expiryDate:
        medicine.expiryDate
          ?.split("T")[0] || "",
      supplier:
        medicine.supplier || "",
    });

    setShowModal(true);
  }}
  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md text-white px-3 py-1 rounded"
>
  Edit
</button>

 {user?.role === "admin" && (
  <button
    onClick={() =>
      handleDelete(
        medicine._id
      )
    }
    className="bg-gradient-to-r from-rose-500 to-red-600 shadow-md text-white px-3 py-1 rounded"
  >
    Delete
  </button>
)}

  </div>
</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="md:hidden space-y-4">
  {medicines
    .filter((medicine) => {

      const matchesSearch =
        medicine.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        !categoryFilter ||
        medicine.category ===
          categoryFilter;

      const matchesStock =
        !stockFilter ||

        (stockFilter === "low" &&
          medicine.stockQuantity < 10) ||

        (stockFilter === "expiring" &&
          new Date(
            medicine.expiryDate
          ) <
            new Date(
              Date.now() +
                180 *
                  24 *
                  60 *
                  60 *
                  1000
            ));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    })
    .map((medicine) => (
      <div
        key={medicine._id}
        className="bg-white rounded-2xl shadow-lg p-4 border border-blue-100"
      >

        <h3 className="font-bold text-lg text-indigo-700">
          {medicine.name}
        </h3>

        <p className="mt-2">
          <strong>Category:</strong>{" "}
          {medicine.category}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {medicine.stockQuantity}
        </p>

        <p>
          <strong>Price:</strong> ₹
          {medicine.unitPrice}
        </p>

        <p>
          <strong>Expiry:</strong>{" "}
          {new Date(
            medicine.expiryDate
          ).toLocaleDateString()}
        </p>

        <div className="flex gap-2 mt-4">

          <button
            onClick={() => {
              setEditMode(true);

              setSelectedMedicineId(
                medicine._id
              );

              setShowModal(true);
            }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg"
          >
            Edit
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() =>
                handleDelete(
                  medicine._id
                )
              }
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-lg"
            >
              Delete
            </button>
          )}

        </div>

      </div>
    ))}
</div>
    </div>
  </div>

  {showModal && (
   <div className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center overflow-y-auto p-4 z-50">
     <div className="bg-white/95 backdrop-blur-xl p-5 md:p-8 rounded-3xl shadow-2xl w-[95vw] md:w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
  {editMode
    ? "Edit Medicine"
    : "Add Medicine"}
</h2>

      <form
  onSubmit={
    editMode
      ? handleUpdateMedicine
      : handleAddMedicine
  }
         className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="border border-blue-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Generic Name"
          className="border border-blue-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
            value={
              formData.genericName
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                genericName:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category:
                  e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            className="border p-3 rounded"
            value={
              formData.stockQuantity
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                stockQuantity:
                  e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Unit Price"
            className="border p-3 rounded"
            value={formData.unitPrice}
            onChange={(e) =>
              setFormData({
                ...formData,
                unitPrice:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Batch Number"
            className="border p-3 rounded"
            value={
              formData.batchNumber
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                batchNumber:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Manufacturer"
            className="border p-3 rounded"
            value={
              formData.manufacturer
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                manufacturer:
                  e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border p-3 rounded"
            value={
              formData.expiryDate
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                expiryDate:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Supplier"
            className="border p-3 rounded col-span-2"
            value={formData.supplier}
            onChange={(e) =>
              setFormData({
                ...formData,
                supplier:
                  e.target.value,
              })
            }
          />

          <div className="col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setShowModal(false)
              }
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg hover:shadow-xl text-white rounded"
            >
             {editMode
  ? "Update Medicine"
  : "Save Medicine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

</Layout>
);
}

export default Medicines;
