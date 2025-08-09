import Home from "./pages/Home";
import SavedFighters from "./pages/SavedFighters";
import SavedFights from "./pages/SavedFights";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  let component;
  switch (window.location.pathname) {
    case "/":
      document.title = "MMA Stats - Home";
      component = <Home />;
      break;
    case "/savedFighters":
      document.title = "Saved Fighters";
      component = <SavedFighters />;
      break;
    case "/savedFights":
      document.title = "Saved Fights";
      component = <SavedFights />;
      break;
    default:
      component = <Home />;
  }

  return (
    <>
      <NavBar />
      <div>{component}</div>
    </>
  );
};

export default App;
