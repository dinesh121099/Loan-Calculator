import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">My App</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
