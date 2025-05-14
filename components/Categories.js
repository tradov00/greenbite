export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-12">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: "Plant-Based", icon: "🥦" },
            { title: "Low Waste", icon: "♻️" },
            { title: "Quick Meals", icon: "⏱️" },
            { title: "Budget Friendly", icon: "💰" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-green-100 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
