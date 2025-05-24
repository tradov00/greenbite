export default function Features() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-12">
          Why Choose GreenBite?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-2 text-green-700">Eco-Friendly</h3>
            <p>All recipes focus on sustainability and reduce food waste.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-2 text-green-700">Healthy Options</h3>
            <p>Curated for balance, health, and energy using fresh ingredients.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-2 text-green-700">Easy to Cook</h3>
            <p>Simple, clear instructions make cooking stress-free and enjoyable.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
