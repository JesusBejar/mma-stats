const NavBar = () => {
  return (
    <nav>
      <div>
        <ul>
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
