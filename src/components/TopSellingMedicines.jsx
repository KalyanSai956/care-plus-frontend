function TopSellingMedicines({
  medicines,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6">

      <h2 className="text-2xl font-bold text-indigo-700 mb-6">
        Top Selling Medicines
      </h2>

      {/* Desktop Table */}
      <table className="hidden md:table w-full">

        <thead>
          <tr className="border-b border-blue-100">
            <th className="text-left p-3 text-indigo-900">
              Medicine
            </th>

            <th className="text-left p-3 text-indigo-900">
              Quantity Sold
            </th>
          </tr>
        </thead>

        <tbody>
          {medicines.map(
            (medicine, index) => (
              <tr
                key={index}
                className="border-b border-blue-50 hover:bg-blue-50"
              >
                <td className="p-3 font-medium">
                  {medicine.medicine}
                </td>

                <td className="p-3">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full">
                    {medicine.quantitySold}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>

      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">

        {medicines.map(
          (medicine, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-4 border border-blue-100"
            >
              <h3 className="font-bold text-indigo-700 text-lg">
                {medicine.medicine}
              </h3>

              <p className="mt-2 text-slate-600">
                Quantity Sold
              </p>

              <span className="inline-block mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full">
                {medicine.quantitySold}
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default TopSellingMedicines;