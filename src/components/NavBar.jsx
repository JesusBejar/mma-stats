const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MMA Stats</div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="home-page">
              Home
            </a>
          </li>
          <li>
            <a href="/fighters" className="fighters-page">
              Fighters
            </a>
          </li>
          <li>
            <a href="/events" className="events-page">
              UFC events
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
