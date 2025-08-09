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
            <a href="/savedFighters" className="fighters-page">
              Saved Fighters
            </a>
          </li>
          <li>
            <a href="/savedFights" className="events-page">
              Saved Fights
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
