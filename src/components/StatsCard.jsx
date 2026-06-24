function StatsCard({
  title,
  value,
}) {
  return (
   <div className="bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <p className="text-slate-500 font-medium">

        {title}
        </p>

     <h2 className="text-4xl font-bold text-indigo-700 mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;