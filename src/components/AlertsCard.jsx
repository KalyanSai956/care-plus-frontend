function AlertsCard({
  title,
  medicines,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">
        {title}
      </h2>

      {medicines.length === 0 ? (
        <p>No medicines found</p>
      ) : (
        medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="border-b py-2"
          >
            {medicine.name}
          </div>
        ))
      )}
    </div>
  );
}

export default AlertsCard;