export default function Header() {
  return (
    <header className="bg-red-700 flex justify-between items-center">
      <h1 className="flex items-center text-2xl font-bold  text-amber-300">
        FOOD STORE
      </h1>
      <nav className="w-full flex space-x-6">
        <ul className="flex space-x-6">
          <li className="text-lg px-4 py-2 font-medium text-amber-50 hover:text-yellow-400">
            <a href="/">Home</a>
          </li>
          <li className="text-lg px-4 py-2 font-medium text-amber-50 hover:text-yellow-400">
            <a href="/">Shop</a>
          </li>
          <li className="text-lg px-4 py-2 font-medium text-amber-50 hover:text-yellow-400">
            <a href="/">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
