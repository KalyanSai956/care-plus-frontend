import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function Billing() {
  const [medicines, setMedicines] =
    useState([]);

  const [customerName,
    setCustomerName] =
    useState("");

  const [customerPhone,
    setCustomerPhone] =
    useState("");

  const [selectedMedicine,
    setSelectedMedicine] =
    useState("");

  const [quantity,
    setQuantity] =
    useState(1);

  const [items, setItems] =
    useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

const fetchMedicines = async () => {
  try {
   const response =
  await API.get("/medicines");

console.log(response.data);

    console.log(
      "Medicines Response:",
      response.data
    );

    setMedicines(
      response.data.medicines || []
    );
  } catch (error) {
    console.error(
      "Medicines Error:",
      error.response?.data || error
    );
  }
};

  const addItem = () => {
  if (!selectedMedicine) {
    alert("Please select a medicine");
    return;
  }

  const medicine = medicines.find(
    (m) => m._id === selectedMedicine
  );

  if (!medicine) {
    alert("Medicine not found");
    return;
  }

  setItems([
    ...items,
    {
      medicine: medicine._id,
      name: medicine.name,
      quantity: Number(quantity),
      price: medicine.unitPrice,
    },
  ]);

  setSelectedMedicine("");
  setQuantity(1);
};
const removeItem = (index) => {
  const updatedItems =
    items.filter(
      (_, i) => i !== index
    );

  setItems(updatedItems);
};
const generateInvoice = async () => {
  try {
    const invoiceData = {
      customerName,
      customerPhone,
   items: items.map((item) => ({
  medicineId: item.medicine,
  quantity: item.quantity,
})),
      totalAmount,
    };

    const response = await API.post(
      "/invoices",
      invoiceData
    );

   downloadInvoicePDF();

alert(
  "Invoice Generated Successfully"
);

    console.log(response.data);

    setCustomerName("");
    setCustomerPhone("");
    setItems([]);
  } catch (error) {
  console.error(error);

  console.log(
    "Invoice Error:",
    error.response?.data
  );

  alert(
    JSON.stringify(
      error.response?.data
    )
  );
}
};
const downloadInvoicePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Care Plus Pharmacy", 14, 20);

  doc.setFontSize(12);
  doc.text(
    `Customer: ${customerName}`,
    14,
    35
  );

  doc.text(
    `Phone: ${customerPhone}`,
    14,
    43
  );

  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    14,
    51
  );

  autoTable(doc, {
    startY: 60,
    head: [
      [
        "Medicine",
        "Quantity",
        "Price",
        "Total",
      ],
    ],
    body: items.map((item) => [
      item.name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.quantity * item.price}`,
    ]),
  });

  doc.text(
    `Grand Total: ₹${totalAmount}`,
    14,
    doc.lastAutoTable.finalY + 15
  );

  doc.save(
    `Invoice-${Date.now()}.pdf`
  );
};

  const totalAmount =
    items.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          item.price,
      0
    );

  return (
      <Layout>
    <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">

     <div className="bg-white/70 backdrop-blur-xl  shadow-xl border border-blue-100 p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Customer Phone"
            value={customerPhone}
            onChange={(e) =>
              setCustomerPhone(
                e.target.value
              )
            }
          className="border border-blue-200 p-3 focus:ring-2 focus:ring-blue-200 outline-none"
          />

        </div>
<div className="bg-white/70 backdrop-blur-xl  shadow-xl border border-blue-100 p-6 mt-6">

  <h2 className="text-xl font-bold mb-4">
    Invoice Items
  </h2>

  {items.length === 0 ? (
    <p className="text-gray-500">
      No items added
    </p>
  ) : (
    <>
      <table className="w-full text-slate-700">

       <thead className="bg-blue-50">
          <tr>
            <th className="text-left p-2">
              Medicine
            </th>

            <th className="text-left p-2">
              Quantity
            </th>

            <th className="text-left p-2">
              Price
            </th>

          <th className="text-left p-2">
  Action
</th>
          </tr>
        </thead>

        <tbody>
  {items.map((item, index) => (
    <tr key={index}>

      <td className="p-2">
        {item.name}
      </td>

      <td className="p-2">
        {item.quantity}
      </td>

      <td className="p-2">
        ₹{item.price}
      </td>

      <td className="p-2">
        ₹{item.quantity * item.price}
      </td>

      <td className="p-2">
        <button
          onClick={() =>
            removeItem(index)
          }
    className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-4 py-2 rounded-xl shadow"
        >
          Remove
        </button>
      </td>

    </tr>
  ))}
</tbody>

      </table>

      <div className="mt-4 text-right text-xl font-bold">
        Total Amount: ₹{totalAmount}
      </div>
      <button
  onClick={generateInvoice}
  className="mt-4 bg-gradient-to-r from-emerald-600 to-green-500 hover:scale-105 transition text-white px-6 py-3 rounded-xl shadow-lg"
>
  Generate Invoice
</button>
    </>
  )}

</div>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
            <p className="text-sm text-gray-500">
  Medicines Loaded: {medicines.length}
</p>

        <select
  value={selectedMedicine}
  onChange={(e) =>
    setSelectedMedicine(
      e.target.value
    )
  }
  className="border p-3 rounded"
>
  <option value="">
    Select Medicine
  </option>

  {medicines &&
    medicines.map((medicine) => (
      <option
        key={medicine._id}
        value={medicine._id}
      >
        {medicine.name}
      </option>
    ))}
</select>
          

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />

          <button
            onClick={addItem}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl h-12 shadow-lg hover:scale-105 transition"
          >
            Add Item
          </button>

        </div>
        

      </div>
      

    </div>
</Layout>    
  );
}

export default Billing;