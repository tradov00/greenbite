export default function Hero() {
  return (
    <section className="bg-green-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to GreenBite</h1>
        <p className="text-xl mb-8">
          Discover healthy and eco-friendly recipes to nourish your body and the planet.
        </p>
        <a
          href="/recipes"
          className="bg-white text-green-600 font-semibold py-2 px-6 rounded hover:bg-green-100"
        >
          Explore Recipes
        </a>
      </div>
    </section>
  );
}