import "./App.css";
import FullPageLoader from "./components/loader";
import Routing from "./routes";
const App = () => {
  return (
    <div className="flex ">
      <FullPageLoader />
      <Routing />
    </div>
  );
};

export default App;
