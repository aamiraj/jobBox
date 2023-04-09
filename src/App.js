import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useMonitorAuth } from "./hooks/useMonitorAuth";
import routes from "./routes/routes";

function App() {
  useMonitorAuth();
  return (
    <>
      <Toaster></Toaster>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
