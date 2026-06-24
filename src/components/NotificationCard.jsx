function NotificationCard({
  lowStock,
  expiring,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Notifications
      </h2>

      <div className="space-y-3">
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
           {lowStock.length} Medicines Low Stock
        </div>

        <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg">
           {expiring.length} Medicines Expiring Soon
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;