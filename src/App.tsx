import "./App.css";
import FullPageLoader from "./components/loader";
import Routing from "./routes";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="flex ">
      <FullPageLoader />
      <Routing />
      <Toaster />
    </div>
  );
};

export default App;
