export default function Testimonials() {
  return (
    <section className="bg-green-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <p>&quot;GreenBite helped me reduce my food waste and discover amazing recipes!&quot;</p>
            <span className="block mt-4 font-semibold text-green-700">– Alex</span>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p>&quot;Simple, healthy, and eco-conscious. What more could you want?&quot;</p>
            <span className="block mt-4 font-semibold text-green-700">– Priya</span>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p>&quot;My go-to source for sustainable meal planning!&quot;</p>
            <span className="block mt-4 font-semibold text-green-700">– Leo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
