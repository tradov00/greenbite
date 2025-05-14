export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8 mt-20">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} GreenBite. All rights reserved.</p>
        <nav className="flex justify-center gap-6 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
