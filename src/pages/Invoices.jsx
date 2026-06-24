import { useEffect, useState } from "react";
import API from "../api/axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Layout from "../components/Layout";

function Invoices() {
  const [invoices, setInvoices] =
    useState([]);
    const [search, setSearch] =
  useState("");

const [filteredInvoices,
  setFilteredInvoices] =
  useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);
useEffect(() => {
  const filtered =
    invoices.filter(
      (invoice) =>
        invoice.customerName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        invoice.invoiceNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  setFilteredInvoices(
    filtered
  );
}, [search, invoices]);
  const fetchInvoices = async () => {
    try {
      const response =
        await API.get("/invoices");

    setInvoices(
  response.data.invoices
);

setFilteredInvoices(
  response.data.invoices
);
    } catch (error) {
      console.error(error);
    }
  };
const downloadPDF = async (id) => {
  try {
    const response = await API.get(
      `/invoices/${id}/pdf`,
      {
        responseType: "blob",
      }
    );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      `invoice-${id}.pdf`
    );

    document.body.appendChild(link);

    link.click();

    link.remove();
  } catch (error) {
    console.error(error);
    alert(
      "Failed to download PDF"
    );
  }
};
const exportToExcel = () => {
  const worksheet =
    XLSX.utils.json_to_sheet(
      filteredInvoices.map(
        (invoice) => ({
          InvoiceNo:
            invoice.invoiceNumber,
          Customer:
            invoice.customerName,
          Phone:
            invoice.customerPhone,
          Amount:
            invoice.totalAmount,
          Date: new Date(
            invoice.createdAt
          ).toLocaleDateString(),
        })
      )
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Invoices"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

  const fileData =
    new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

  saveAs(
    fileData,
    "Invoice_Report.xlsx"
  );
};
  return (
      <Layout>
   <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
    <div className="bg-white/70 backdrop-blur-xl shadow-xl border border-blue-100 p-6">
        <div className="mb-4">
  <input
    type="text"
    placeholder="Search by Customer or Invoice No"
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
   className="border border-blue-200 rounded-xl p-3 w-full md:w-96 focus:ring-2 focus:ring-blue-200 outline-none"
  />

</div>
<button
  onClick={exportToExcel}
 className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition"
>
  Export Excel
</button>
      <div className="overflow-x-auto">
  <table className="hidden md:table w-full">

          <thead className="bg-blue-50">
            <tr>
              <th className="p-4 text-left text-blue-900 font-semibold uppercase tracking-wide text-sm">
                Invoice No
              </th>

              <th className="p-4 text-left text-blue-900 font-semibold uppercase tracking-wide text-sm">
                Customer
              </th>

              <th className="p-4 text-left text-blue-900 font-semibold uppercase tracking-wide text-sm">
                Phone
              </th>

              <th className="p-4 text-left text-blue-900 font-semibold uppercase tracking-wide text-sm">
                Amount
              </th>

              <th className="p-4 text-left text-blue-900 font-semibold uppercase tracking-wide text-sm">
                Date
              </th>

              <th className="p-4 text-left text-blue-900 font-semibold uppercase tracking-wide text-sm">
                PDF
              </th>
            </tr>
          </thead>

          <tbody>
           {filteredInvoices.map(
              (invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b border-blue-100 hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3">
                    {
                      invoice.invoiceNumber
                    }
                  </td>

                  <td className="p-3">
                    {
                      invoice.customerName
                    }
                  </td>

                  <td className="p-3">
                    {
                      invoice.customerPhone
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      invoice.totalAmount
                    }
                  </td>

                  <td className="p-3">
                    {new Date(
                      invoice.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">

               <button
  onClick={() =>
    downloadPDF(invoice._id)
  }
  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
>
  PDF
</button>

                  </td>

                </tr>
              )
            )}
          </tbody>

        </table>
        <div className="md:hidden space-y-4">

  {filteredInvoices.map((invoice) => (

    <div
      key={invoice._id}
      className="bg-white rounded-2xl shadow-lg border border-blue-100 p-4"
    >

      <h3 className="font-bold text-lg text-indigo-700">
        Invoice #{invoice.invoiceNumber}
      </h3>

      <p className="mt-2">
        <strong>Customer:</strong>{" "}
        {invoice.customerName}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {invoice.customerPhone}
      </p>

      <p>
        <strong>Amount:</strong> ₹
        {invoice.totalAmount}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(
          invoice.createdAt
        ).toLocaleDateString()}
      </p>

      <button
        onClick={() =>
          downloadPDF(invoice._id)
        }
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-xl shadow"
      >
        Download PDF
      </button>

    </div>

  ))}

</div>
</div>
      </div>

    </div>
    </Layout>
  );
}

export default Invoices;