import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-green-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to GreenBite</h1>
        <p className="text-xl mb-8">
          Discover healthy and eco-friendly recipes to nourish your body and the planet.
        </p>
        <Link
          href="/recipes"
          className="bg-white text-lg text-green-600 font-semibold py-4 px-10 rounded hover:bg-orange-400"
        >
          Explore Recipes
        </Link>
      </div>
    </section>
  );
}
